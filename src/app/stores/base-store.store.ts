import { inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';
import { MSG_SUCESSO_ATUALIZAR } from '../common';

export abstract class BaseStore {
  private readonly _loadingSource = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loadingSource.asObservable();

  private readonly msg = inject(NzMessageService);

  iniciarLoading() {
    this._loadingSource.next(true);
  }

  finalizarLoading() {
    this._loadingSource.next(false);
  }

  enviarMensagem(
    tipo: 'success' | 'info' | 'warning' | 'error' | 'loading',
    texto: string
  ) {
    this.msg.create(tipo, texto, {});
  }

  enviarMensagemSucessoAtualizar() {
    this.enviarMensagem('success', MSG_SUCESSO_ATUALIZAR);
  }
}
