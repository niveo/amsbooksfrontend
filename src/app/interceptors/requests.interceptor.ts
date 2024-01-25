import { Inject, Injectable } from '@angular/core';
import { Observable, from, lastValueFrom } from 'rxjs';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { APP_CONFIG, IConfigToken } from '../utils/app-config';
import { fetchAuthSession } from 'aws-amplify/auth';

/https://www.banjocode.com/post/angular/interceptor-async-await
@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(@Inject(APP_CONFIG) private readonly conf: IConfigToken) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          from(this.handle401Error(req, next));
        }
      })
    );
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const { idToken } = (await fetchAuthSession()).tokens ?? {};
    console.log(idToken);

    if (idToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + idToken.toString(),
        },
      });
      //return await lastValueFrom(next.handle(authReq));
    } else {
    }
    return await lastValueFrom(next.handle(req));
  }
}
