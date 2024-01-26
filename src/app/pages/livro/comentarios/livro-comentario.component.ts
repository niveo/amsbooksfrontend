import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutenticacaoStore } from 'src/app/stores';
import { LivroComentarioStore } from 'src/app/stores/livro-comentario.store';

@Component({
  selector: 'app-livro-comentario-component',
  templateUrl: './livro-comentario.component.html',
  styleUrl: './livro-comentario.component.scss',
})
export class LivroComentarioComponent implements OnInit {
  @Input({ required: true })
  livroId: number;

  rate: number;
  data: any[] = [];
  submitting = false;
  inputValue = '';
  storeSub: Subscription;

  constructor(
    public readonly autenticacaoStore: AutenticacaoStore,
    private readonly livroComentarioStore: LivroComentarioStore
  ) {}

  ngOnInit(): void {
    this.livroComentarioStore.init(this.livroId);

    this.storeSub = this.livroComentarioStore.stateChanged.subscribe(
      (state) => {
        console.log(state);

        this.data = state.data;
      }
    );

    this.livroComentarioStore.fetchData();
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    const rate = this.rate;
    this.inputValue = '';
    this.rate = 0;
    this.livroComentarioStore.addComentario(rate, content);
  }
}
