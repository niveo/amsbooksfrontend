import { Component, Input, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AutenticacaoStore } from 'src/app/stores';
import { LivroComentarioStore } from 'src/app/stores/livro-comentario.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-livro-comentario-component',
  templateUrl: './livro-comentario.component.html',
  styleUrl: './livro-comentario.component.scss',
})
export class LivroComentarioComponent {
  public readonly autenticacaoStore = inject(AutenticacaoStore);
  private readonly livroComentarioStore = inject(LivroComentarioStore);

  @Input({ required: true })
  livroId: number;

  rate: number;
  data$: Observable<any[]>;
  usuarioLogado$: Observable<boolean>;
  loading = false;
  inputValue = '';
  comentarioIdHistorico$: Observable<any>;

  constructor() {
    this.livroComentarioStore.loading$
      .pipe(takeUntilDestroyed())
      .subscribe((loading) => (this.loading = loading));

    this.data$ = this.livroComentarioStore.data$;
    this.usuarioLogado$ = this.autenticacaoStore.usuarioLogado$;
    this.comentarioIdHistorico$ =
      this.livroComentarioStore.comentarioIdHistorico$;
  }

  handleSubmit(): void {
    const content = this.inputValue;
    const rate = this.rate;
    this.inputValue = '';
    this.rate = 0;
    this.livroComentarioStore.addComentario(rate, content);
  }

  removerComentario(comentarioId: number, idx: number) {
    this.livroComentarioStore.removerComentario(comentarioId, idx);
  }
}
