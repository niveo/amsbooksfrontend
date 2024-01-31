import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioPerfilStore } from 'src/app/stores/usuario-perfil.store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MSG_SUCESSO_ATUALIZAR, MSG_ERRO_ATUALIZAR } from 'src/app/common';

@Component({
  selector: 'app-usuario-perfil-component',
  templateUrl: './usuario-perfil.component.html',
  styleUrl: './usuario-perfil.component.scss',
})
export class UsuarioPerfilComponent implements OnInit {
  private readonly _usuarioPerfilStore = inject(UsuarioPerfilStore);
  private readonly _nzMessageService = inject(NzMessageService);
  usuarioPerfil$: Observable<any>;

  ngOnInit(): void {
    this.usuarioPerfil$ = this._usuarioPerfilStore.usuarioPerfil$;
  }

  alterarNome() {
    this._usuarioPerfilStore.alterarNome().subscribe({
      next: (value) => {
        value
          ? this._nzMessageService.success(MSG_SUCESSO_ATUALIZAR)
          : this._nzMessageService.error(MSG_ERRO_ATUALIZAR);
      },
      error: (error) => {
        console.error(error);
        this._nzMessageService.error(MSG_ERRO_ATUALIZAR);
      },
    });
  }
}
