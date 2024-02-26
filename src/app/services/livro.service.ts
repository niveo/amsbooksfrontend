import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';
import { BaseHttpService } from './base-http.service';
import { carregarParametros } from '../common';

@Injectable({
  providedIn: 'root',
})
export class LivroService extends BaseHttpService {
  override path: string = '/livros';

  getAll(pagesize, page, params) {
    const pm = carregarParametros({
      params: params ? JSON.stringify(params) : null,
      pagesize: pagesize,
      page: page,
    });
    return this.http
      .get<{ results: any[]; count: number }>(this.path, {
        params: pm,
      })
      .pipe(catchError(handleError));
  }

  getLivroDetalhe(id: number) {
    return this.http
      .get<any>(this.path + '/' + id)
      .pipe(catchError(handleError));
  }
}
