import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

  constructor() {
    const sub = interval(1000).subscribe(() => {
      if (
        this.authenticatorService.authStatus !== 'configuring' &&
        this.authenticatorService.user?.userId
      ) {
        sub.unsubscribe();
        this.fetchDataAuthenticator();
      }
    });
  }

  get isUsuarioLogado(): boolean {
    return this._usuarioLogadoSource.getValue();
  }

  get getUserId(): string {
    return this._userIdSource.getValue();
  }

  private fetchDataAuthenticator(): void {
    console.log('fetchDataAuthenticator');

    if (this.authenticatorService.authStatus === 'authenticated') {
      this._userIdSource.next(this.authenticatorService.user.userId);
      this.fetchData(true);
    }
  }

  fetchData(usuarioLogado: boolean): void {
    console.log('fetchData', usuarioLogado);
    this.authenticated.set(usuarioLogado);
    this._usuarioLogadoSource.next(usuarioLogado);
    if (!usuarioLogado) {
      this._userIdSource.next(null);
      this.router.navigate(['/']);
    }
  }
}
