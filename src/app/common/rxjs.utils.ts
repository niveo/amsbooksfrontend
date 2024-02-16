import {
  EnvironmentInjector,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EMPTY, Observable, of, skipWhile } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MSG_ERRO_PROCESSAR } from './messages';

export const skipNull =
  () =>
  <T>(source: Observable<T>): Observable<T> =>
    source.pipe(skipWhile((value) => value === null));

export const catchErrorForMessage =
  (msg: NzMessageService) =>
  <T>(source: Observable<T>): Observable<any> =>
    source.pipe(
      catchError((error) => {
        console.error(error);

        msg.error(MSG_ERRO_PROCESSAR);

        return EMPTY;
      })
    );
