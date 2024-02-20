import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';

@Injectable()
export class ColecaoLivroVinculoService extends BaseHttpService {
  override path: string = '/colecoes_livros_vinculos';

  getAll(livroId: number) {
    return this.http
      .get<any[]>(this.path, {
        params: {
          livroId: livroId,
        },
      })
      .pipe(catchError(handleError));
  }

  create(descricao: string) {
    return this.http.post(this.path, {
      descricao,
    });
  }

  delete(id: any) {
    return this.http.delete(`${this.path}/${id}`);
  }
}
