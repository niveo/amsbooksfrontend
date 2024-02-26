import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../common/handle-error';
import { BaseHttpService } from './base-http.service';
import { Tag } from '../entities/tag';

@Injectable({
  providedIn: 'root',
})
export class TagService extends BaseHttpService {
  override path: string = '/tags';
  getAll() {
    return this.http.get<Tag[]>(this.path).pipe(catchError(handleError));
  }
}
