import { LivroService } from 'src/app/services/livro.service';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, finalize, map, throwError } from 'rxjs';
import { BaseLoadingStore } from './base-loading.store';
import { skipNull } from '../common/rxjs.utils';
import { MonitorErroStore } from './monitor-erro.store';

@Injectable()
export class LivroDetalheStore extends BaseLoadingStore {
  private readonly _dataSource = new BehaviorSubject<any>(null);
  readonly data$ = this._dataSource.asObservable();

  private readonly _livroIdSource = new BehaviorSubject<any>(null);
  readonly livroId$ = this._livroIdSource.asObservable();

  private readonly monitorErroStore = inject(MonitorErroStore);

  private readonly livroService = inject(LivroService);

  constructor() {
    super();
    this.livroId$.pipe(skipNull()).subscribe((value) => {
      this.iniciarLoading();
      this.livroService
        .getLivroDetalhe(value)
        .pipe(finalize(() => this.finalizarLoading())) 
        .subscribe({
          next: (respose) => {
            this._dataSource.next(respose);
          },
          error: (err) => {
            this.monitorErroStore.notificar(err);
          },
        });
    });
  }

  fetchData(livroId: number): void {
    this._livroIdSource.next(livroId);
  }
}
