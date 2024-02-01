import { Injectable, inject } from '@angular/core';
import { Observable, catchError, from, mergeMap } from 'rxjs';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'; 
import { fetchAuthSession } from 'aws-amplify/auth';
import { AutenticacaoStore } from '../stores';
import { TOKEN_APP_CONFIG } from '../common';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  private readonly conf = inject(TOKEN_APP_CONFIG);
  private readonly authenticator = inject(AutenticacaoStore);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    if (!this.authenticator.authenticated()) {
      return this.defaultClone(req, next);
    } else {
      return from(fetchAuthSession()).pipe(
        mergeMap(({ tokens }) => {
          if (tokens.idToken) {
            const authReq = req.clone({
              url: this.conf.apiUri + req.url,
              //Passado para pegar sessão
              withCredentials: true,
              setHeaders: {
                Authorization: 'Bearer ' + tokens.idToken.toString(),
              },
            });
            return next.handle(authReq);
          } else {
            return this.defaultClone(req, next);
          }
        }),
        catchError((error) => {
          console.error(error);
          return this.defaultClone(req, next);
        })
      );
    }
  }

  defaultClone(req: HttpRequest<any>, next: HttpHandler) {
    const dupReq = req.clone({
      //Passado para pegar sessão
      withCredentials: true,
      url: this.conf.apiUri + req.url,
    });
    return next.handle(dupReq);
  }
}
