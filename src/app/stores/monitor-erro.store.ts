import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { skipNull } from '../common/rxjs.utils';

@Injectable({
  providedIn: 'root',
})
export class MonitorErroStore {
  private readonly _dataSource = new BehaviorSubject<any>(null);
  private readonly data$ = this._dataSource.asObservable();
  private readonly router = inject(Router);

  constructor() {
    this.data$.pipe(skipNull()).subscribe((msg) => {
      this.router.navigate(['error', { erro: msg }]);
    });
  }

  notificar(erro: any) {
    console.error(erro);
    this._dataSource.next(erro);
  }
}
