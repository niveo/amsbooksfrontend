import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';

@Injectable()
export class LivroHistoricoUsuarioService {
  constructor(private readonly http: HttpClient) {}

  obterLivroHistoricoUsuario(livroId: number) {
    return this.http
      .get<any>('/livro-historico-usuario', {
        params: {
          livroId: livroId,
        },
      })
      .pipe(catchError(handleError));
  }
}
