import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, finalize, from, tap } from 'rxjs';
import { catchErrorForMessage, skipNull } from '../common/rxjs.utils';
import { ColecaoLivroService } from '../services/colecao-livro.service';
import { BaseStore } from './base-store.store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MSG_SUCESSO_PROCESSAR } from '../common';

@Injectable({
  providedIn: 'root',
})
export class ColecaoLivroStore extends BaseStore {
  private readonly _dataSource = new BehaviorSubject<any[]>([]);
  readonly data$ = this._dataSource.asObservable();

  private readonly colecaoLivroService = inject(ColecaoLivroService);
  private readonly nzMessageService = inject(NzMessageService);

  constructor() {
    super();
    this.carregarData();
  }

  carregarObservable(observable: Observable<any>) {
    this.iniciarLoading();
    return from(observable).pipe(
      finalize(() => {
        this.finalizarLoading();
      }),
      catchErrorForMessage(this.nzMessageService)
    );
  }

  private carregarData() {
    this.carregarObservable(this.colecaoLivroService.getAll()).subscribe({
      next: (response) => {
        if (response) {
          this._dataSource.next(response);
        }
      },
    });
  }

  remover(item: any, idx: number) {
    this.carregarObservable(this.colecaoLivroService.delete(item.id)).subscribe(
      {
        next: () => {
          this._dataSource.value.splice(idx, 1);
          this.nzMessageService.success(MSG_SUCESSO_PROCESSAR);
        },
      }
    );
  }

  salvar(descricao) {
    return this.carregarObservable(
      this.colecaoLivroService.create(descricao)
    ).pipe(
      tap({
        next: (value) => {
          this._dataSource.value.push({
            id: value,
            descricao: descricao,
          });
          this.nzMessageService.success(MSG_SUCESSO_PROCESSAR);
        },
      })
    );
  }

  atualizar(colecaoId, descricao) {
    return this.carregarObservable(
      this.colecaoLivroService.update(colecaoId, descricao)
    ).pipe(
      tap({
        next: () => {
          const registro = this._dataSource.value.find(
            (f) => f.id === colecaoId
          );
          registro.descricao = descricao;
          this.nzMessageService.success(MSG_SUCESSO_PROCESSAR);
        },
      })
    );
  }
}
