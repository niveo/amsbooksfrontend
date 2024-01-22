import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private readonly http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>('/tags').pipe(catchError(handleError));
  }
}
