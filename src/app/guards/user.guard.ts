import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacaoStore } from '../stores';

export const userGuard: CanActivateFn = () => {
  return inject(AutenticacaoStore).authenticated()
    ? true
    : inject(Router).navigate([
        { outlets: { autenticacaoPopup: ['autenticacao'] } },
      ]);
};
