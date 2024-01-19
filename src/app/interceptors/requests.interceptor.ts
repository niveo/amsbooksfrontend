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
    console.log(this.conf.apiUri + req.url);

    let userid = sessionStorage.getItem('USER_ID');

    const dupReq = req.clone({
      url: this.conf.apiUri + req.url,
      //setHeaders: { userid: userid  },
    });
    return next.handle(dupReq);
  }
}
