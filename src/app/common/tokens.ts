import { InjectionToken } from '@angular/core';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

export const TOKEN_CARREGAR_IMAGEM_REMOTA = new InjectionToken<boolean>(
  'Token carregar imagem remota'
);
