import { ImagemRemotaService } from 'src/app/services';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { DIRETORIO_IMAGEM_USUARIO, MSG_ERRO_ATUALIZAR } from 'src/app/common';
import { AutenticacaoStore } from 'src/app/stores';
import { UsuarioPerfilStore } from 'src/app/stores/usuario-perfil.store';
import { PerfilUsuario } from 'src/app/model';

@Component({
  selector: 'app-usuario-perfil-imagem-component',
  templateUrl: './usuario-perfil-imagem.component.html',
  styles: [
    `
      :host ::ng-deep .avatar-uploader > .ant-upload {
        width: 128px;
        height: 128px;
        padding: 5px;
      }
    `,
  ],
})
export class UsuarioPerfilImagemComponent implements OnInit {
  private readonly msg = inject(NzMessageService);
  private readonly _usuarioPerfilStore = inject(UsuarioPerfilStore);

  loading = false;
  usuarioPerfil$: Observable<PerfilUsuario>;

  ngOnInit(): void {
    this.usuarioPerfil$ = this._usuarioPerfilStore.usuarioPerfil$;
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.msg.error('You can only upload JPG file!');
      return false;
    }
    const isLt2M = file.size! / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('Image must smaller than 2MB!');
      return false;
    }

    this._usuarioPerfilStore.alterarImagem(file).subscribe({
      error: (err) => {
        console.error(err);
        this.msg.error(MSG_ERRO_ATUALIZAR);
      },
    });

    return false;
  };
}
