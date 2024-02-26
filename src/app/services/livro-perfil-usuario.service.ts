import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class LivroPerfiloUsuarioService extends BaseHttpService {
  override path: string = '/livros_perfil_usuarios';

  get(livroId: number) {
    return this.http
      .get<any>(this.path, {
        params: {
          livroId: livroId,
        },
      })
      .pipe(catchError(handleError));
  }

  upsert(livroId: number, situacaoLeitura: number) {
    return this.http
      .post<any>(this.path, {
        livroId: livroId,
        situacaoLeitura: situacaoLeitura,
      })
      .pipe(catchError(handleError));
  }
}
