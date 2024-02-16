import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';
import { BaseHttpService } from './base-http.service';

export class LivroComentarioInputDto {
  livroId: number;
  texto: string;
  rate: number;
}

@Injectable()
export class LivroComentarioService extends BaseHttpService {
  override path: string = '/livros_comentarios';

  getAll(livroId: number) {
    return this.http
      .get<any>(this.path, {
        params: {
          livroId: livroId,
        },
      })
      .pipe(catchError(handleError));
  }

  getComentarioIdLivroUsuario(livroId: number) {
    return this.http
      .get<any>(this.path + '/comentarioidusuario', {
        params: {
          livroId: livroId,
        },
      })
      .pipe(catchError(handleError));
  }

  create(livroComentarioInputDto: LivroComentarioInputDto) {
    return this.http
      .post<any>(this.path, livroComentarioInputDto)
      .pipe(catchError(handleError));
  }

  delete(comentarioId: number) {
    return this.http
      .delete<any>(this.path + '/' + comentarioId)
      .pipe(catchError(handleError));
  }
}
