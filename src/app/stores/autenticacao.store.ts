import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { BehaviorSubject, Subscription } from 'rxjs';

export interface StoreStateModel {
  usuarioLogado: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoStore {
  private readonly authenticatorService = inject(AuthenticatorService);
  private readonly router = inject(Router);
  private readonly _usuarioLogadoSource = new BehaviorSubject<boolean>(false);
  readonly usuarioLogado$ = this._usuarioLogadoSource.asObservable();

  authenticated = signal(false);

  initialState = {
    usuarioLogado: false,
  };

  constructor() {
    setTimeout(() => {
      this.fetchData(this.authenticatorService.authStatus === 'authenticated');
    }, 300);
  }

  get isUsuarioLogado(): boolean {
    return this._usuarioLogadoSource.getValue();
  }

  fetchData(usuarioLogado: boolean): void {
    this._usuarioLogadoSource.next(usuarioLogado);
    this.authenticated.set(usuarioLogado);
    if (!usuarioLogado) {
      this.router.navigate(['/']);
    }
  }
}
