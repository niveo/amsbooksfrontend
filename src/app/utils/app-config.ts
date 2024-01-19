import { InjectionToken } from '@angular/core';

export interface IConfigToken {
  production: boolean;
  apiUri: string;

  imageKitPublicKey: string;
  imageKitUrlEndPoint: string;
  imageKitAuthenticationEndpoint: string;

  imageKitUrlEndPointLivros: string; 
}
export const APP_CONFIG = new InjectionToken<IConfigToken>(
  'Application config'
);
