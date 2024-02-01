import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IconsProviderUserModule } from 'src/app/modules/icons-provider-user.module';
import { PerfilUsuario } from 'src/app/model';
import { UsuarioPerfilStore } from 'src/app/stores/usuario-perfil.store';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-usuario-perfil-avatar-component',
  template: `@if(usuarioPerfil$ | async; as user){
    <nz-avatar nzIcon="user" [nzSrc]="user.picture" />
    }`,
  standalone: true,
  imports: [NzAvatarModule, IconsProviderUserModule, AsyncPipe],
})
export class UsuarioPerfilAvatarComponent {
  private readonly _usuarioPerfilStore = inject(UsuarioPerfilStore);

  usuarioPerfil$: Observable<PerfilUsuario>;

  constructor() {
    this.usuarioPerfil$ = this._usuarioPerfilStore.usuarioPerfil$;
  }
}
