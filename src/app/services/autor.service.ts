import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';

@Injectable()
export class AutorService extends BaseHttpService {
  create(nome: string, descricao: string, url: string) {
    return this.http.post('/autor', {
      nome,
      descricao,
      url,
    });
  }

  update(id: number, nome: string, descricao: string, url: string) {
    return this.http.post('/autor/' + id, {
      nome,
      descricao,
      url,
    });
  }

  obterAutorUsuario() {
    return this.http
      .get<any>('/autor/autorusuario')
      .pipe(catchError(handleError));
  }
}
