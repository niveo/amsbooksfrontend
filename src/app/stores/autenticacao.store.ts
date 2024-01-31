import { Injectable, signal } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { BehaviorSubject } from 'rxjs';


export interface StoreStateModel {
  usuarioLogado: boolean;
}

@Injectable({
  providedIn: 'root',
  deps: [AuthenticatorService],
})
export class AutenticacaoStore {
  private readonly _usuarioLogadoSource = new BehaviorSubject<boolean>(false);
  readonly usuarioLogado$ = this._usuarioLogadoSource.asObservable();

  authenticated = signal(false);

  initialState = {
    usuarioLogado: false,
  };

  constructor(public authenticator: AuthenticatorService) {
    setTimeout(() => {
      this.fetchData(authenticator.authStatus === 'authenticated');
    }, 300);
  }

  get isUsuarioLogado(): boolean {
    return this._usuarioLogadoSource.getValue();
  }

  fetchData(usuarioLogado: boolean): void {
    this._usuarioLogadoSource.next(usuarioLogado);
    this.authenticated.set(usuarioLogado);
  }
}
