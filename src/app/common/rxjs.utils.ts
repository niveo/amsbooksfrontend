import { inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of, skipWhile } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MSG_ERRO_PROCESSAR } from './messages';

export const skipNull =
  () =>
  <T>(source: Observable<T>): Observable<T> =>
    source.pipe(skipWhile((value) => value === null));

export const catchErrorForMessage =
  () =>
  <T>(source: Observable<T>): Observable<any> =>
    source.pipe(
      catchError((error) => {
        console.error(error);
        inject(NzMessageService).error(MSG_ERRO_PROCESSAR);
        return of(`Bad Promise: ${error}`);
      })
    );
