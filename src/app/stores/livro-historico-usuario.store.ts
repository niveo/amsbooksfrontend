import { Injectable, inject } from '@angular/core';
import { LivroHistoricoUsuarioService } from '../services';
import { LivroDetalheStore } from './livro-detalhe.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseStore } from './base-store.store';

@Injectable()
export class LivroHistoricoUsuarioStore extends BaseStore {
  private livroId: number;
  private readonly livroHistoricoUsuarioService = inject(
    LivroHistoricoUsuarioService
  );
  private readonly livroDetalheStore = inject(LivroDetalheStore);

  constructor() {
    super();
    this.livroDetalheStore.livroId$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((livroId) => {
        if (livroId) {
          this.livroId = livroId;
          this.fetchData();
        }
      });
  }

  private fetchData() {
    this.livroHistoricoUsuarioService
      .obterLivroHistoricoUsuario(this.livroId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response) {
          }
        },
      });
  }
}
