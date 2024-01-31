import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class LivroHistoricoUsuarioService extends BaseHttpService {
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
