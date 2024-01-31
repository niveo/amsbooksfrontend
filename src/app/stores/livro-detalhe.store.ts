import { LivroService } from 'src/app/services/livro.service';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { BaseLoadingStore } from './base-loading.store';

@Injectable()
export class LivroDetalheStore extends BaseLoadingStore {
  private readonly _dataSource = new BehaviorSubject<any>(null);
  readonly data$ = this._dataSource.asObservable();

  private readonly _livroIdSource = new BehaviorSubject<any>(null);
  readonly livroId$ = this._livroIdSource.asObservable();

  private readonly livroService = inject(LivroService);

  fetchData(livroId: number): void {
    this._livroIdSource.next(livroId);
    this.iniciarLoading();

    this.livroService
      .getLivroDetalhe(livroId)
      .pipe(finalize(() => this.finalizarLoading()))
      .subscribe({
        next: (respose) => {
          this._dataSource.next(respose);
        },
      });
  }
}
