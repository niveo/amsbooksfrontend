import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';

@Injectable()
export class ColecaoLivroService extends BaseHttpService {
  override path: string = '/colecoes_livros';

  getAll() {
    return this.http.get<any[]>(this.path).pipe(catchError(handleError));
  }

  create(descricao: string) {
    return this.http.post(this.path, {
      descricao,
    });
  }

  update(id: number, descricao: string) {
    return this.http.put(`${this.path}/${id}`, {
      descricao,
    });
  }

  delete(id: any) {
    return this.http.delete(`${this.path}/${id}`);
  }
}
