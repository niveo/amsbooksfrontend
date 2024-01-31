import { Component, Inject } from '@angular/core'; 
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
    <app-menu-usuario-component />
    } `,
})
export class PerfilUsuarioButtonComponent {
  usuarioLogado$: Observable<boolean>;

  constructor(
    private router: Router,
    public readonly autenticacaoStore: AutenticacaoStore
  ) {
    this.usuarioLogado$ = autenticacaoStore.usuarioLogado$;
  }

  logarUsuario() {
    this.router.navigate([
      { outlets: { autenticacaoPopup: ['autenticacao'] } },
    ]);
  }
}
