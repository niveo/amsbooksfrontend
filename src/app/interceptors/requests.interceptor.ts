import { Injectable, inject } from '@angular/core';
import { Observable, catchError, mergeMap } from 'rxjs';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AutenticacaoStore } from '../stores';
import { TOKEN_APP_CONFIG } from '../common';
import { AutenticacaoService } from '../services';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  private readonly conf = inject(TOKEN_APP_CONFIG);
  private readonly authenticator = inject(AutenticacaoStore);
  private readonly autenticacaoService = inject(AutenticacaoService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(this.authenticator.authenticated());

    if (!this.authenticator.authenticated()) {
      console.log('Not authenticated');
      
      return this.defaultClone(req, next);
    } else {
      return this.autenticacaoService.obterUsuarioSessao().pipe(
        mergeMap((token) => {

          console.log('Authenticated');

          if (token) {
            const authReq = req.clone({
              url: this.conf.apiUri + req.url,
              //Passado para pegar sessão
              withCredentials: true,
              setHeaders: {
                Authorization: 'Bearer ' + token,
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
