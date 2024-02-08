import { Component, Input, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AutenticacaoStore } from 'src/app/stores';
import { LivroComentarioStore } from 'src/app/stores/livro-comentario.store';

@Component({
  selector: 'app-livro-comentario-component',
  templateUrl: './livro-comentario.component.html',
  styleUrl: './livro-comentario.component.scss',
})
export class LivroComentarioComponent implements OnInit {
  public readonly autenticacaoStore = inject(AutenticacaoStore);
  private readonly livroComentarioStore = inject(LivroComentarioStore);

  @Input({ required: true })
  livroId: number;

  rate: number;
  data$: Observable<any[]>;
  usuarioLogado$: Observable<boolean>;
  loading = false;
  inputValue = '';
  storeLoadingSub: Subscription;
  comentarioIdHistorico$: Observable<any>;

  constructor() {
    this.storeLoadingSub = this.livroComentarioStore.loading$.subscribe(
      (loading) => (this.loading = loading)
    );
  }

  ngOnInit(): void {
    this.data$ = this.livroComentarioStore.data$;
    this.usuarioLogado$ = this.autenticacaoStore.usuarioLogado$;
    this.comentarioIdHistorico$ =
      this.livroComentarioStore.comentarioIdHistorico$;
  }

  ngOnDestroy() {
    if (this.storeLoadingSub) {
      this.storeLoadingSub.unsubscribe();
    }
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
