import { Injectable } from '@angular/core';
import { LivroHistoricoUsuarioService } from '../services';
import { LivroDetalheStore } from './livro-detalhe.store';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LivroHistoricoUsuarioStore {
  private livroId: number;

  constructor(
    private readonly livroHistoricoUsuarioService: LivroHistoricoUsuarioService,
    private readonly livroDetalheStore: LivroDetalheStore
  ) {
    this.livroDetalheStore.livroId$.subscribe((livroId) => {
      if (livroId) {
        this.livroId = livroId;
        this.fetchData();
      }
    });
  }
  fetchData() {
    this.livroHistoricoUsuarioService
      .obterLivroHistoricoUsuario(this.livroId)
      .subscribe({
        next: (response) => {
          if (response) {
          }
        },
      });
  }
}
