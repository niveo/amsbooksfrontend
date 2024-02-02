import { BehaviorSubject } from 'rxjs';

export abstract class BaseLoadingStore {
  private readonly _loadingSource = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loadingSource.asObservable();

  iniciarLoading() {
    this._loadingSource.next(true);
  }

  finalizarLoading() {
    this._loadingSource.next(false);
  }
}
