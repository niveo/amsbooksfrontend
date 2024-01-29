import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { LivroComentarioService } from '../services/livro-comentario.service';

@Injectable()
export class LivroComentarioStore {
  private readonly _dataSource = new BehaviorSubject<any[]>([]);
  readonly data$ = this._dataSource.asObservable();

  private readonly _loadingSource = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loadingSource.asObservable();

  initialState = {
    loading: false,
    data: [],
  };
  livroId: number;

  constructor(public livroComentarioService: LivroComentarioService) {}

  init(livroId: number) {
    this.livroId = livroId;
  }

  addComentario(rate: number, texto: string) {
    this._loadingSource.next(true);

    this.livroComentarioService
      .create({
        livroId: this.livroId,
        rate: rate,
        texto: texto,
      })
      .pipe(finalize(() => this._loadingSource.next(false)))
      .subscribe({
        next: (response) => {
          this._dataSource.next([response, ...this._dataSource.getValue()]);
        },
        error: () => {},
      });
  }

  fetchData(): void {
    this._loadingSource.next(true);
    this.livroComentarioService
      .getAll(this.livroId)
      .pipe(finalize(() => this._loadingSource.next(false)))
      .subscribe({
        next: (response) => {
          this._dataSource.next(response);
        },
        error: () => {},
      });
  }
}
