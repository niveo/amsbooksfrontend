import { AutenticacaoStore } from 'src/app/stores';
import { Injectable, inject } from '@angular/core';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { BehaviorSubject, from } from 'rxjs';
import { UsuarioPerfilRemotoService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class UsuarioPerfilStore {
  private readonly _usuarioPerfilSource = new BehaviorSubject<any>(null);
  readonly usuarioPerfil$ = this._usuarioPerfilSource.asObservable();

  private readonly _usuarioPerfilRemotoService = inject(
    UsuarioPerfilRemotoService
  );

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

  alterarNome() {
    const value = this._usuarioPerfilSource.getValue();
    return this._usuarioPerfilRemotoService.atualizarNome(value.name)
  }
}
