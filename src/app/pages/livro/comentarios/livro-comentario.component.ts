import { AutenticacaoStore } from './../../../services/autenticacao.store';
import { Component, Inject } from '@angular/core';

import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { formatDistance } from 'date-fns';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LogarButtonComponent } from 'src/app/componentes';
import { CommonModule } from '@angular/common';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-livro-comentario-component',
  templateUrl: './livro-comentario.component.html',
  styleUrl: './livro-comentario.component.scss',
  standalone: true,
  imports: [
    NzRateModule,
    FormsModule,
    NzCommentModule,
    NzListModule,
    NzFormModule,
    NzAvatarModule,
    NzButtonModule,
    NzInputModule, 
    CommonModule,
    NzAlertModule,
  ],
})
export class LivroComentarioComponent {
  rate;
  data: any[] = [];
  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  };
  inputValue = '';

  constructor(public readonly autenticacaoStore: AutenticacaoStore) {}

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    const rate = this.rate;
    this.inputValue = '';
    this.rate = 0;
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
          content,
          rate,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date()),
        },
      ].map((e) => ({
        ...e,
        displayTime: formatDistance(new Date(), e.datetime),
      }));
    }, 800);
  }
}
