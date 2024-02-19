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
  ],
  providers: [ColecaoLivroService],
})
export class UsuarioLivroColecaoComponent implements OnInit {
  @Input({ required: true })
  livroId: number;
  descricao: string;
  idEdicao: number;
  registros = [];
  maxlengthDescricao = 25;
  loading = false;

  @ViewChild('input', { static: false })
  public txtInputDescricao: ElementRef;

  private readonly colecaoLivroService = inject(ColecaoLivroService);
  private readonly nzMessageService = inject(NzMessageService);

  ngOnInit(): void {
    this.carregarObservable(this.colecaoLivroService.getAll()).subscribe({
      next: (response) => {
        if (response) {
          this.registros = response;
        }
      },
    });
  }

  salvarDescricao() {
    if (this.descricao) {
      if (!this.idEdicao) {
        this.carregarObservable(
          this.colecaoLivroService.create(this.descricao)
        ).subscribe({
          next: (value) => {
            this.registros.push({
              id: value,
              descricao: this.descricao,
            });
            this.descricao = '';
            this.idEdicao = null;
            this.nzMessageService.success(MSG_SUCESSO_PROCESSAR);
          },
        });
      } else {
        this.carregarObservable(
          this.colecaoLivroService.update(this.idEdicao, this.descricao)
        ).subscribe({
          next: () => {
            const registro = this.registros.find((f) => (f.id === this.idEdicao));
            registro.descricao = this.descricao;
            this.descricao = '';
            this.idEdicao = null;
            this.nzMessageService.success(MSG_SUCESSO_PROCESSAR);
          },
        });
      }
    }
  }

  editarDescricao(item: any) {
    this.descricao = item.descricao;
    this.idEdicao = item.id;
    this.txtInputDescricao.nativeElement.focus();
    this.txtInputDescricao.nativeElement.select();
  }

  removerDescricao(item: any, idx: number) {
    this.carregarObservable(this.colecaoLivroService.delete(item.id)).subscribe(
      {
        next: () => {
          this.registros.splice(idx, 1);
          this.nzMessageService.success(MSG_SUCESSO_PROCESSAR);
        },
      }
    );
  }

  carregarObservable(observable: Observable<any>) {
    this.loading = true;
    return from(observable).pipe(
      finalize(() => {
        this.loading = false;
      }),
      catchErrorForMessage(this.nzMessageService)
    );
  }
}
