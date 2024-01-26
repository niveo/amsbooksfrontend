import { Component, Inject } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AutenticacaoComponent } from '../pages/autenticacao/autenticacao.component';
import { AutenticacaoStore } from '../stores';

@Component({
  selector: 'app-logar-button-component',
  template: `@if(!autenticacaoStore.isUsuarioLogado){
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
    }`,
})
export class LogarButtonComponent {
  constructor(
    private readonly ser: NzModalService,
    public readonly autenticacaoStore: AutenticacaoStore
  ) {}

  logarUsuario() {
    this.ser.create({
      nzContent: AutenticacaoComponent,
      nzFooter: null,
      nzCloseIcon: null,
    });
  }
}
