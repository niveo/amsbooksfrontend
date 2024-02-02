import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class TagService extends BaseHttpService { 

  getAll() {
    return this.http.get<any[]>('/tags').pipe(catchError(handleError));
  }
}
