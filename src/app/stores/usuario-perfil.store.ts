import { AutenticacaoStore } from 'src/app/stores';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, from, map, mergeMap } from 'rxjs';
import { ImagemRemotaService, UsuarioPerfilRemotoService } from '../services';
import {
  CognitoIdentityServiceProvider,
  DIRETORIO_IMAGEM_USUARIO,
  TOKEN_AWS_AUTH,
} from '../common';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { PerfilUsuario } from '../model';
import { sessionStorage } from 'aws-amplify/utils';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UsuarioPerfilStore {
  private readonly _usuarioPerfilSource = new BehaviorSubject<PerfilUsuario>(
    null
  );
  readonly usuarioPerfil$ = this._usuarioPerfilSource.asObservable();

  private readonly _imagemRemotaService = inject(ImagemRemotaService);

  private readonly _usuarioPerfilRemotoService = inject(
    UsuarioPerfilRemotoService
  );
  private readonly autenticacaoStore = inject(AutenticacaoStore);

  private readonly awsAuthConfig = inject(TOKEN_AWS_AUTH);

  constructor() {
    this.autenticacaoStore.usuarioLogado$.subscribe((logado) => {
      if (logado) {
        this.atualizarPerfilUsuario();
      }
    });
  }

  private atualizarPerfilUsuario() {
    from(
      sessionStorage.getItem(
        `${CognitoIdentityServiceProvider}.${this.awsAuthConfig.userPoolClientId}.LastAuthUser`
      )
    )
      .pipe(
        mergeMap((lastAuthUser) => {
          return from(
            sessionStorage.getItem(
              `${CognitoIdentityServiceProvider}.${this.awsAuthConfig.userPoolClientId}.${lastAuthUser}.idToken`
            )
          );
        }),
        map((token: string) => {
          return jwtDecode(token);
        })
      )
      .subscribe({
        next: (value: any) => {
          value['picture'] = this._imagemRemotaService.getUrlPublic(
            DIRETORIO_IMAGEM_USUARIO + value.sub
          );
          this._usuarioPerfilSource.next({
            name: value.name,
            email: value.email,
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  alterarNome() {
    const value = this._usuarioPerfilSource.getValue();
    return this._usuarioPerfilRemotoService.atualizarNome(value.name);
  }

  alterarImagem(file: NzUploadFile) {
    return this._imagemRemotaService
      .upload(DIRETORIO_IMAGEM_USUARIO + this.autenticacaoStore.getUserId, file)
      .pipe(
        map((atualizado) => {
          console.log(atualizado);

          if (atualizado) {
            this.atualizarPerfilUsuario();
          }
          return atualizado;
        })
      );
  }
}
