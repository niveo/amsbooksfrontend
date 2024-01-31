import { AutenticacaoStore } from 'src/app/stores';
import { Injectable } from '@angular/core';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioPerfilStore {
  private readonly _usuarioPerfilSource = new BehaviorSubject<any>(null);
  readonly usuarioPerfil$ = this._usuarioPerfilSource.asObservable();

  constructor(autenticacaoStore: AutenticacaoStore) {
    autenticacaoStore.usuarioLogado$.subscribe((logado) => {
      if (logado) {
        from(fetchUserAttributes()).subscribe({
          next: (value) => {
            this._usuarioPerfilSource.next(value);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
}
