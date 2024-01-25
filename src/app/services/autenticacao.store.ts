import { Injectable } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { ObservableStore } from '@codewithdan/observable-store';
import { Observable, of } from 'rxjs';

export interface StoreStateModel {
  usuarioLogado: boolean;
}

@Injectable({
  providedIn: 'root',
  deps: [AuthenticatorService],
})
export class AutenticacaoStore extends ObservableStore<StoreStateModel> {
  initialState = {
    usuarioLogado: false,
  };

  constructor(public authenticator: AuthenticatorService) {
    super({
      logStateChanges: true,
    });
    setTimeout(() => {
      this.fetchData(authenticator.authStatus === 'authenticated');
    }, 300);
    this.setState(this.initialState, 'INIT_STATE');
  }

  get(): Observable<StoreStateModel> {
    const state = this.getState();
    return of(state);
  }

  get isUsuarioLogado(): boolean {
    return this.getState().usuarioLogado;
  }

  fetchData(usuarioLogado: boolean): void {
    this.setState(
      {
        usuarioLogado: usuarioLogado,
      },
      'FETCHED_DATA'
    );
  }
}
