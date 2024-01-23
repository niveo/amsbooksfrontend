import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';
import { Livro } from '../entities/livro';
import { carregarParametros } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  constructor(private readonly http: HttpClient) {}

  getAll(pagesize, page, params) {
    const pm = carregarParametros({
      params: params ? JSON.stringify(params) : null,
      pagesize: pagesize,
      page: page,
    });
    return this.http
      .get<{ results: any[]; count: number }>('/livros', {
        params: pm,
      })
      .pipe(catchError(handleError));
  }

  getLivroDetalhe(id: number) {
    return this.http.get<any>('/livros/' + id).pipe(catchError(handleError));
  }
}
