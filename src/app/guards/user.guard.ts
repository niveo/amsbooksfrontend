import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AutenticacaoStore } from '../stores';
import { Observable } from 'rxjs';

export const userGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(AutenticacaoStore).authenticated()
    ? true
    : inject(Router).navigate([
        { outlets: { autenticacaoPopup: ['autenticacao'] } },
      ]);
};
