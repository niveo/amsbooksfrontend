import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
  data$: Observable<any[]>;
  loading = false;
  inputValue = '';
  storeSub: Subscription;
  storeLoadingSub: Subscription;

  constructor(
    public readonly autenticacaoStore: AutenticacaoStore,
    private readonly livroComentarioStore: LivroComentarioStore
  ) {}

  ngOnInit(): void {
    this.livroComentarioStore.init(this.livroId);

    this.data$ = this.livroComentarioStore.data$;

    this.storeLoadingSub = this.livroComentarioStore.loading$.subscribe(
      (loading) => (this.loading = loading)
    );

    this.livroComentarioStore.fetchData();
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
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
}
