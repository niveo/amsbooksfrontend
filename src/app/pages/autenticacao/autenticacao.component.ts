import { Component } from '@angular/core';
import { Hub } from 'aws-amplify/utils';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-autenticacao-component',
  templateUrl: './autenticacao.component.html',
  styleUrl: './autenticacao.component.scss',
})
export class AutenticacaoComponent {
  constructor(private modal: NzModalRef) {
    const subs = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          this.modal.close();
          subs();
          break;
      }
    });
  }
}
