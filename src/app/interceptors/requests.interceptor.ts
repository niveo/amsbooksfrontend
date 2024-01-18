import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { APP_CONFIG, IConfigToken } from '../utils/app-config';
@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(@Inject(APP_CONFIG) private readonly conf: IConfigToken) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const dupReq = req.clone({
      setHeaders: { userid: sessionStorage.getItem('USER_ID') },
    });
    return next.handle(dupReq);
  }
}
