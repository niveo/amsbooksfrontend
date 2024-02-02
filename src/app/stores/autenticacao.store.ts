import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { BehaviorSubject, interval } from 'rxjs';

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

  private readonly _userIdSource = new BehaviorSubject<string>(null);
  readonly userId$ = this._userIdSource.asObservable();

  authenticated = signal(false);

  initialState = {
    usuarioLogado: false,
  };

  constructor() {
    const subs = interval(1000).subscribe(() => {
      if (this.authenticatorService.authStatus !== 'configuring') {
        setTimeout(() => {
          if (this.authenticatorService.authStatus === 'authenticated') {
            this.fetchDataAuthenticator(this.authenticatorService);
          }
        }, 300);
        subs.unsubscribe();
      }
    });
  }

  get isUsuarioLogado(): boolean {
    return this._usuarioLogadoSource.getValue();
  }

  get getUserId(): string {
    return this._userIdSource.getValue();
  }

  private fetchDataAuthenticator(
    authenticatorService: AuthenticatorService
  ): void {
    this._userIdSource.next(authenticatorService.user.userId);
    this.fetchData(authenticatorService.authStatus === 'authenticated');
  }

  fetchData(usuarioLogado: boolean): void {
    this._usuarioLogadoSource.next(usuarioLogado);
    this.authenticated.set(usuarioLogado);
    if (!usuarioLogado) {
      this._userIdSource.next(null);
      this.router.navigate(['/']);
    }
  }
}
