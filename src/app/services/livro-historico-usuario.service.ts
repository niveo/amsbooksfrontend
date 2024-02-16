import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class LivroHistoricoUsuarioService extends BaseHttpService {
  override path: string = '/livro_historico_usuario';
  obterLivroHistoricoUsuario(livroId: number) {
    return this.http
      .get<any>(this.path, {
        params: {
          livroId: livroId,
        },
      })
      .pipe(catchError(handleError));
  }
}
