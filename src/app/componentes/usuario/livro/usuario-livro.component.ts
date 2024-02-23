import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Observable, pipe, tap } from 'rxjs';
import { IconsProviderUserModule } from 'src/app/modules/icons-provider-user.module';
import { UsuarioPerfilStore } from 'src/app/stores/usuario-perfil.store';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { UsuarioLivroColecaoTagComponent } from './usuario-livro-colecao-tag.component';
import { LivroPerfiloUsuarioService } from 'src/app/services';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MSG_ERRO_ATUALIZAR, MSG_ERRO_CARREGAR } from 'src/app/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-usuario-livro-component',
  templateUrl: './usuario-livro.component.html',
  standalone: true,
  imports: [
    NzButtonModule,
    NzToolTipModule,
    NzRadioModule,
    AsyncPipe,
    IconsProviderUserModule,
    FormsModule,
    UsuarioLivroColecaoTagComponent,
    JsonPipe,
  ],
  providers: [LivroPerfiloUsuarioService],
})
export class LivroUsuarioComponent {
  @Input({ required: true })
  livroId: number;
  usuarioPerfil$: Observable<any>;
  situacaoLeitura: string;

  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;

  private readonly usuarioPerfilStore = inject(UsuarioPerfilStore);
  private readonly drawerService = inject(NzDrawerService);
  private readonly livroPerfiloUsuarioService = inject(
    LivroPerfiloUsuarioService
  );

  private readonly nzMessageService = inject(NzMessageService);
  protected readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.usuarioPerfil$ = this.usuarioPerfilStore.usuarioPerfil$;
  }

  private pipeTapError = (msg: string) =>
    pipe(
      takeUntilDestroyed(this.destroyRef),
      tap({
        error: (err) => {
          console.error('error', err);
          setTimeout(() => {
            this.nzMessageService.error(msg);
          }, 300);
        },
      })
    );

  carregar() {
    if (!this.livroId && !this.usuarioPerfilStore.isUsuarioLogado) return;
    this.livroPerfiloUsuarioService
      .get(this.livroId)
      .pipe(this.pipeTapError(MSG_ERRO_CARREGAR))
      .subscribe({
        next: (value: any) => {
          this.situacaoLeitura = String(value.situacaoLeitura);
        },
      });
  }

  change() {
    this.livroPerfiloUsuarioService
      .upsert(this.livroId, Number(this.situacaoLeitura))
      .pipe(this.pipeTapError(MSG_ERRO_ATUALIZAR))
      .subscribe();
  }

  abrirMenu() {
    const drawerRef = this.drawerService.create({
      nzContent: this.drawerTemplate,
      nzContentParams: {
        livroId: this.livroId,
      },
    });
    drawerRef.afterOpen.subscribe(() => {
      this.carregar();
    });
  }
}
