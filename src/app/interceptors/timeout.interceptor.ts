import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { DEFAULT_TIMEOUT } from '../common/tokens';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const timeoutc: number =
      Number(req.headers.get('timeout')) || this.defaultTimeout;
    req.headers.delete('timeout');
    return next.handle(req).pipe(timeout(timeoutc));
  }
}
