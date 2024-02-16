import { AutenticacaoStore } from 'src/app/stores';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, finalize, map } from 'rxjs';
import {
  AutenticacaoService,
  ImagemRemotaService,
  UsuarioPerfilRemotoService,
} from '../services';
import { DIRETORIO_IMAGEM_USUARIO } from '../common';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { PerfilUsuario } from '../model';
import { BaseStore } from './base-store.store';
import { catchErrorForMessage } from '../common/rxjs.utils';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class UsuarioPerfilStore extends BaseStore {
  private readonly _usuarioPerfilSource = new BehaviorSubject<PerfilUsuario>(
    null
  );
  readonly usuarioPerfil$ = this._usuarioPerfilSource.asObservable();

  private readonly _imagemRemotaService = inject(ImagemRemotaService);

  private readonly _usuarioPerfilRemotoService = inject(
    UsuarioPerfilRemotoService
  );
  private readonly autenticacaoStore = inject(AutenticacaoStore);

  private readonly autenticacaoService = inject(AutenticacaoService);

  private readonly nzMessageService = inject(NzMessageService);

  constructor() {
    super();
    this.autenticacaoStore.usuarioLogado$.subscribe((logado) => {
      if (logado) {
        this.atualizarPerfilUsuario();
      }
    });
  }

  private atualizarPerfilUsuario() {
    this.autenticacaoService.obterUsuarioSessaoDecode().subscribe({
      next: (value: any) => {
        value['picture'] = this._imagemRemotaService.getUrlPublic(
          DIRETORIO_IMAGEM_USUARIO + value.sub
        );
        this._usuarioPerfilSource.next({
          userId: value.sub,
          name: value.name,
          email: value.email,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get name(): string {
    return this._usuarioPerfilSource.getValue().name;
  }

  salvar(name: string) {
    this.iniciarLoading();
    this._usuarioPerfilRemotoService
      .atualizarNome(name)
      .pipe(catchErrorForMessage(this.nzMessageService))
      .pipe(finalize(() => this.finalizarLoading()))
      .subscribe({
        next: () => {
          this.enviarMensagemSucessoAtualizar();
        },
      });
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
