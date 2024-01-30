import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AutenticacaoStore } from 'src/app/stores';
import { LivroComentarioStore } from 'src/app/stores/livro-comentario.store';
import { getUrl } from 'aws-amplify/storage';

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
  usuarioLogado$: Observable<boolean>;
  loading = false;
  inputValue = '';
  storeLoadingSub: Subscription;
  comentarioIdHistorico$: Observable<any>;

  constructor(
    public readonly autenticacaoStore: AutenticacaoStore,
    private readonly livroComentarioStore: LivroComentarioStore
  ) {}

  ngOnInit(): void {
    this.data$ = this.livroComentarioStore.data$;
    this.usuarioLogado$ = this.autenticacaoStore.usuarioLogado$;
    this.comentarioIdHistorico$ =
      this.livroComentarioStore.comentarioIdHistorico$;

    this.storeLoadingSub = this.livroComentarioStore.loading$.subscribe(
      (loading) => (this.loading = loading)
    );
  }

  ngOnDestroy() {
    if (this.storeLoadingSub) {
      this.storeLoadingSub.unsubscribe();
    }
  }

  async getAvatarItem(usuarioId: number) {
    return (
      await getUrl({
        key: String(usuarioId),
        options: {
          validateObjectExistence: true, // defaults to false
        },
      })
    ).url.toString();
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
