import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';

export class LivroComentarioInputDto {
  livroId: number; 
  texto: string;
  rate: number;
}

@Injectable({
  providedIn: 'root',
})
export class LivroComentarioService {
  constructor(private readonly http: HttpClient) {}

  getAll(livroId: number) {
    return this.http
      .get<any>('/livros_comentarios', {
        params: {
          livroId: livroId,
        },
      })
      .pipe(catchError(handleError));
  }

  create(livroComentarioInputDto: LivroComentarioInputDto) {
    return this.http
      .post<any>('/livros_comentarios', livroComentarioInputDto)
      .pipe(catchError(handleError));
  }
}
