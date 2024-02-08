import { Injectable, inject } from '@angular/core';
import { AutorService } from '../services/autor.service';
import { BehaviorSubject, finalize } from 'rxjs';
import { BaseLoadingStore } from './base-loading.store';
import { skipNull } from '../common/rxjs.utils';

@Injectable()
export class UsuarioAutorStore extends BaseLoadingStore {
  private readonly _dataSource = new BehaviorSubject<any>(null);
  readonly data$ = this._dataSource.asObservable();

  private readonly autorService = inject(AutorService);

  salvar(nome: string, descricao: string, url: string) {
    if (this._dataSource.getValue()?.id) {
      this.autorService
      .update(this._dataSource.getValue().id, nome, descricao, url)
      .subscribe({
        error(err) {
          console.error(err);
        },
        next(value) {
          console.log(value);
        },
      });
    } else {
      this.autorService.createWithUser(nome, descricao, url).subscribe({
        error(err) {
          console.error(err);
        },
        next(value) {
          console.log(value);
        },
      });
     
    }
  }

  carregarDados() {
    this.iniciarLoading();
    this.autorService
      .obterAutorUsuario()
      .pipe(finalize(() => this.finalizarLoading()))
      .pipe(skipNull())
      .subscribe({
        next: (value) => {
          this._dataSource.next(value);
        },
        error(err) {
          console.log(err);
        },
      });
  }

  copiarNomeDoUsuario() {
    throw new Error('Method not implemented.');
  }
}
