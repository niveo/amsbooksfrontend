import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';

@Injectable()
export class AutorService extends BaseHttpService {
  override path: string = '/autor';
  createWithUser(nome: string, descricao: string, url: string) {
    return this.http.post(this.path + '/createWithUser', {
      nome,
      descricao,
      url,
    });
  }

  update(id: number, nome: string, descricao: string, url: string) {
    return this.http.put(this.path + '/' + id, {
      nome,
      descricao,
      url,
    });
  }

  obterAutorUsuario() {
    return this.http
      .get<any>(this.path + '/autorusuario')
      .pipe(catchError(handleError));
  }
}
