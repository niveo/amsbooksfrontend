import { Injectable, inject } from '@angular/core';
import { AutorService } from '../services/autor.service';
import { BehaviorSubject, finalize, iif, mergeMap, of, tap } from 'rxjs';
import { BaseStore } from './base-store.store';
import { catchErrorForMessage, skipNull } from '../common/rxjs.utils';
import { UsuarioPerfilStore } from './usuario-perfil.store';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class UsuarioAutorStore extends BaseStore {
  private readonly _dataSource = new BehaviorSubject<{
    id?: number;
    nome?: string;
    descricao?: string;
    url?: string;
  }>(null);

  readonly data$ = this._dataSource.asObservable();
  private readonly nzMessageService = inject(NzMessageService);
  private readonly autorService = inject(AutorService);
  private readonly usuarioPerfilStore = inject(UsuarioPerfilStore);

  salvar(nome: string, descricao: string, url: string) {
    this.iniciarLoading();

    of(this._dataSource.getValue()?.id)
      .pipe(
        mergeMap((v) =>
          iif(
            () => !v,
            this.autorService.createWithUser(nome, descricao, url),
            this.autorService.update(v, nome, descricao, url)
          )
        )
      )
      .pipe(finalize(() => this.finalizarLoading()))
      .pipe(catchErrorForMessage(this.nzMessageService))
      .subscribe({
        next: () => {
          this.enviarMensagemSucessoAtualizar();
        },
      });
  }

  carregarDados() {
    this.iniciarLoading();
    this.autorService
      .obterAutorUsuario()
      .pipe(finalize(() => this.finalizarLoading()))
      .pipe(skipNull())
      .subscribe((value) => this._dataSource.next(value));
  }

  copiarNomeDoUsuario() {
    if (!this._dataSource.value) {
      this._dataSource.next({
        nome: this.usuarioPerfilStore.name,
      });
    } else {
      this._dataSource.next({
        ...this._dataSource.getValue(),
        nome: this.usuarioPerfilStore.name,
      });
    }
  }
}
