import { Component, inject } from '@angular/core';
import { AutenticacaoStore } from '../stores';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logar-button-component',
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
})
export class PerfilUsuarioButtonComponent {
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
