import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';
import { Livro } from '../entities/livro';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  constructor(private readonly http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>('/livros').pipe(catchError(handleError));
  }

  getAll2(pageSize, page) {
    return this.http
      .get<any[]>('/livros', {
        params: {
          pagesize: pageSize,
          page: page
        },
      })
      .pipe(catchError(handleError));
  }

  getLivroDetalhe(id: number) {
    return this.http.get<any>('/livros/' + id).pipe(catchError(handleError));
  }
}
