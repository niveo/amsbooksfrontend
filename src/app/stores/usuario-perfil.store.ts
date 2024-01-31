import { AutenticacaoStore } from 'src/app/stores';
import { Injectable, inject } from '@angular/core';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { BehaviorSubject, from, map, zip } from 'rxjs';
import { ImagemRemotaService, UsuarioPerfilRemotoService } from '../services';
import { DIRETORIO_IMAGEM_USUARIO } from '../common';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { PerfilUsuario } from '../model';

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

  constructor() {
    this.autenticacaoStore.usuarioLogado$.subscribe((logado) => {
      if (logado) {
        this.atualizarPerfilUsuario();
      }
    });
  }

  private atualizarPerfilUsuario() {
    zip(
      from(fetchUserAttributes()),
      this._imagemRemotaService.getUrl(
        DIRETORIO_IMAGEM_USUARIO + this.autenticacaoStore.getUserId
      )
    ).subscribe({
      next: (value) => {
        value[0]['picture'] = value[1];
        this._usuarioPerfilSource.next(value[0] as any);
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
          if (atualizado) {
            this.atualizarPerfilUsuario();
          }
          return atualizado;
        })
      );
  }
}
