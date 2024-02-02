import { InjectionToken } from '@angular/core';
import { Amplify } from 'aws-amplify';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

export const TOKEN_CARREGAR_IMAGEM_REMOTA = new InjectionToken<boolean>(
  'Token carregar imagem remota'
);

export const TOKEN_STORAGE_S3 = new InjectionToken<{
  bucket?: string;
  region?: string;
}>('Token storage s3', {
  providedIn: 'root',
  factory: () => Amplify.getConfig().Storage.S3,
});

export const TOKEN_APP_CONFIG = new InjectionToken<{
  production: boolean;
  apiUri: string;
}>('Application config');
