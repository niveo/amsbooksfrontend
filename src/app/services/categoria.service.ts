import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { handleError } from '../common/handle-error';
import { BaseHttpService } from './base-http.service';
import { Categoria } from '../entities/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService extends BaseHttpService {
  override path: string = '/categorias';
  getAll() {
    return this.http
      .get<Categoria[]>(this.path)
      .pipe(catchError(handleError));
  }
}
