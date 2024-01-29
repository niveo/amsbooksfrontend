import { LivroDetalheStore } from 'src/app/stores/livro-detalhe.store';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { LivroComentarioService } from '../services/livro-comentario.service';
import { BaseLoadingStore } from './base-loading.store';

@Injectable()
export class LivroComentarioStore extends BaseLoadingStore {
  private readonly _dataSource = new BehaviorSubject<any[]>([]);
  readonly data$ = this._dataSource.asObservable();

  private readonly _comentarioIdHistoricoSource = new BehaviorSubject<any[]>(
    []
  );
  readonly comentarioIdHistorico$ =
    this._comentarioIdHistoricoSource.asObservable();

  private livroId: number;

  constructor(
    private readonly livroComentarioService: LivroComentarioService,
    private readonly livroDetalheStore: LivroDetalheStore
  ) {
    super();
    this.livroDetalheStore.livroId$.subscribe((livroId) => {
      if (livroId) {
        this.livroId = livroId;
        this.fetchData();
      }
    });

    this.data$.subscribe(() => {
      this.livroComentarioService
        .getComentarioIdLivroUsuario(this.livroId)
        .subscribe((data) => this._comentarioIdHistoricoSource.next(data));
    });
  }

  addComentario(rate: number, texto: string) {
    this.iniciarLoading();

    this.livroComentarioService
      .create({
        livroId: this.livroId,
        rate: rate,
        texto: texto,
      })
      .pipe(finalize(() => this.finalizarLoading()))
      .subscribe({
        next: (response) => {
          this._dataSource.next([response, ...this._dataSource.getValue()]);
        },
        error: () => {},
      });
  }

  fetchData(): void {
    this.iniciarLoading();
    this.livroComentarioService
      .getAll(this.livroId)
      .pipe(finalize(() => this.finalizarLoading()))
      .subscribe({
        next: (response) => {
          this._dataSource.next(response);
        },
        error: () => {
          this._dataSource.next([]);
        },
      });
  }

  removerComentario(codigo: number) {
    this.iniciarLoading();
    this.livroComentarioService
      .delete(codigo)
      .pipe(finalize(() => this.finalizarLoading()))
      .subscribe({
        next: () => {
          this.fetchData();
        },
        error: () => {},
      });
  }
}
