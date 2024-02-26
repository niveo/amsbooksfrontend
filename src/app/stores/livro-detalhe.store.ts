import { LivroService } from 'src/app/services/livro.service';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { BaseStore } from './base-store.store';
import { skipNull } from '../common/rxjs.utils';
import { MonitorErroStore } from './monitor-erro.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class LivroDetalheStore extends BaseStore {
  private readonly _dataSource = new BehaviorSubject<any>(null);
  readonly data$ = this._dataSource.asObservable();

  private readonly _livroIdSource = new BehaviorSubject<any>(null);
  readonly livroId$ = this._livroIdSource.asObservable();

  private readonly monitorErroStore = inject(MonitorErroStore);

  private readonly livroService = inject(LivroService);

  constructor() {
    super();
    this.livroId$
      .pipe(takeUntilDestroyed(this.destroyRef), skipNull())
      .subscribe((value) => {
        this.iniciarLoading();
        this.livroService
          .getLivroDetalhe(value)
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            finalize(() => this.finalizarLoading())
          )
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
