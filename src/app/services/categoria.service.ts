import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private readonly http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>('/categorias').pipe(catchError(handleError));
  }
}
