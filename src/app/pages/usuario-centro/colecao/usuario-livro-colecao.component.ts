import { MSG_SUCESSO_PROCESSAR } from './../../../common/messages';
import {
  Component,
  Input,
  inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { finalize, Observable, from, of } from 'rxjs';
import { catchErrorForMessage } from 'src/app/common/rxjs.utils';
import { IconsProviderUserModule } from 'src/app/modules/icons-provider-user.module';
import { ColecaoLivroService } from 'src/app/services/colecao-livro.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ColecaoLivroStore } from 'src/app/stores';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-usuario-livro-colecao-component',
  templateUrl: './usuario-livro-colecao.component.html',
  standalone: true,
  imports: [
    NzListModule,
    NzButtonModule,
    NzToolTipModule,
    NzInputModule,
    NzSpinModule,
    IconsProviderUserModule,
    FormsModule,
    NzPopconfirmModule,
    AsyncPipe,
  ],
})
export class UsuarioLivroColecaoComponent {
  @Input({ required: true })
  livroId: number;
  descricao: string;
  colecaoId: number;
  data$: Observable<any>;
  maxlengthDescricao = 25;
  loading = false;

  @ViewChild('input', { static: false })
  public txtInputDescricao: ElementRef;

  private readonly colecaoLivroStore = inject(ColecaoLivroStore);

  constructor() {
    this.data$ = this.colecaoLivroStore.data$;
    this.colecaoLivroStore.loading$.subscribe(
      (value) => (this.loading = value)
    );
  }

  salvarDescricao() {
    if (this.descricao) {
      if (!this.colecaoId) {
        this.colecaoLivroStore.salvar(this.descricao).subscribe(() => {
          this.descricao = '';
        });
      } else {
        this.colecaoLivroStore
          .atualizar(this.colecaoId, this.descricao)
          .subscribe(() => {
            this.colecaoId = null;
            this.descricao = '';
          });
      }
    }
  }

  editarDescricao(item: any) {
    this.descricao = item.descricao;
    this.colecaoId = item.id;
    this.txtInputDescricao.nativeElement.focus();
    this.txtInputDescricao.nativeElement.select();
  }

  removerDescricao(item: any, idx: number) {
    this.colecaoLivroStore.remover(item, idx);
  }
}
