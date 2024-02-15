import { Injectable, inject } from '@angular/core';
import { from, map, mergeMap } from 'rxjs';
import { CognitoIdentityServiceProvider, TOKEN_AWS_AUTH } from '../common';
import { sessionStorage } from 'aws-amplify/utils';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  private readonly awsAuthConfig = inject(TOKEN_AWS_AUTH);

  obterUsuarioSessaoDecode() {
    return this.obterUsuarioSessao().pipe(
      map((token: string) => {
        return jwtDecode(token);
      })
    );
  }

  obterUsuarioSessao() {
    return from(
      sessionStorage.getItem(
        `${CognitoIdentityServiceProvider}.${this.awsAuthConfig.userPoolClientId}.LastAuthUser`
      )
    ).pipe(
      mergeMap((lastAuthUser) => {
        return from(
          sessionStorage.getItem(
            `${CognitoIdentityServiceProvider}.${this.awsAuthConfig.userPoolClientId}.${lastAuthUser}.idToken`
          )
        );
      })
    );
  }
}
