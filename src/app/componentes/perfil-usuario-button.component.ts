import { Component, Inject } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AutenticacaoComponent } from '../pages/autenticacao/autenticacao.component';
import { AutenticacaoStore } from '../stores';
import { Observable } from 'rxjs';

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
    <nz-avatar 
      nzIcon="user"
      nzSrc="//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    ></nz-avatar>
    }`,
})
export class PerfilUsuarioButtonComponent {
  usuarioLogado$: Observable<boolean>;

  constructor(
    private readonly ser: NzModalService,
    public readonly autenticacaoStore: AutenticacaoStore
  ) {
    this.usuarioLogado$ = autenticacaoStore.usuarioLogado$;
  }

  logarUsuario() {
    this.ser.create({
      nzContent: AutenticacaoComponent,
      nzFooter: null,
      nzCloseIcon: null,
    });
  }
}
