import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService extends BaseHttpService {
  getAll() {
    return this.http.get<any[]>('/categorias').pipe(catchError(handleError));
  }
}
