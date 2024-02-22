import { AsyncPipe } from '@angular/common';
import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Observable } from 'rxjs';
import { IconsProviderUserModule } from 'src/app/modules/icons-provider-user.module';
import { UsuarioPerfilStore } from 'src/app/stores/usuario-perfil.store';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms'; 
import { UsuarioLivroColecaoTagComponent } from './usuario-livro-colecao-tag.component';

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
    UsuarioLivroColecaoTagComponent
  ],
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

  constructor() {
    this.usuarioPerfil$ = this.usuarioPerfilStore.usuarioPerfil$;
  }

  abrirMenu() {
    const drawerRef = this.drawerService.create({
      nzContent: this.drawerTemplate,
      nzContentParams: {
        livroId: this.livroId,
      },
    });
  }
}
