import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AutenticacaoStore } from 'src/app/stores';
import { UsuarioMenuComponent } from './menu/usuario-menu.component';
import { AsyncPipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderUserModule } from 'src/app/modules/icons-provider-user.module';

@Component({
  selector: 'app-usuario-perfil-logar-button-component',
  template: `@if(!(usuarioLogado$ | async)){
    <button
      nz-button
      [nzGhost]="true"
      nzType="dashed"
      nzShape="circle"
      nz-tooltip="Logar"
      (click)="logarUsuario()"
    >
      <span nz-icon nzType="user"></span>
    </button>
    } @else if(usuarioLogado$ | async){
    <app-usuario-menu-component />
    } `,
  standalone: true,
  imports: [UsuarioMenuComponent, IconsProviderUserModule, AsyncPipe, NzButtonModule],
})
export class UsuarioPerfilLogarButtonComponent {
  private router = inject(Router);
  private readonly autenticacaoStore = inject(AutenticacaoStore);

  usuarioLogado$: Observable<boolean>;

  constructor() {
    this.usuarioLogado$ = this.autenticacaoStore.usuarioLogado$;
  }

  logarUsuario() {
    this.router.navigate([
      { outlets: { autenticacaoPopup: ['autenticacao'] } },
    ]);
  }
}
