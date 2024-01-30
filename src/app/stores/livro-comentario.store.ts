import { LivroDetalheStore } from 'src/app/stores/livro-detalhe.store';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  finalize,
  mergeMap,
  firstValueFrom,
  from,
  switchMap,
  map,
  of,
  flatMap,
  tap,
  forkJoin,
  toArray,
  catchError,
} from 'rxjs';
import { LivroComentarioService } from '../services/livro-comentario.service';
import { BaseLoadingStore } from './base-loading.store';
import { getUrl } from 'aws-amplify/storage';

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

    this._dataSource.subscribe(() => {
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

  getDataFromJson(file) {
    return from(
      getUrl({
        key: file.usuarioId,
        options: {
          accessLevel: 'private',
        },
      })
    ).pipe(
      map((mp) => {
        file.avatar = mp.url.toString();
        return file;
      })
    );
  }

  fetchData(): void {
    this.iniciarLoading();
    this.livroComentarioService
      .getAll(this.livroId)
      .pipe(finalize(() => this.finalizarLoading()))
      .subscribe({
        next: (response: any[]) => {
          if (!response || response.length === 0) {
            this._dataSource.next([]);
          } else {
            var observables = response.map((url) => this.getDataFromJson(url));
            forkJoin(observables).subscribe((val) => {
              this._dataSource.next(val);
            });
          }
        },
        error: () => {
          this._dataSource.next([]);
        },
      });
  }

  removerComentario(comentarioId: number, idx: number) {
    this.iniciarLoading();
    this.livroComentarioService
      .delete(comentarioId)
      .pipe(finalize(() => this.finalizarLoading()))
      .subscribe({
        next: () => {
          const response = [...this._dataSource.getValue()].splice(idx + 1, 1);
          this._dataSource.next(response);
        },
        error: () => {},
      });
  }
}
