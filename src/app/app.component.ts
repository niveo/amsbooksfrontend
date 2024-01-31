import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
import { Hub } from 'aws-amplify/utils';
import { sessionStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { AutenticacaoStore } from './stores';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authenticator = inject(AuthenticatorService);
  private readonly autenticacaoStore = inject(AutenticacaoStore);

  constructor() {
    Amplify.configure(awsExports);
    cognitoUserPoolsTokenProvider.setKeyValueStorage(sessionStorage);

    Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          this.autenticacaoStore.fetchData(true);
          break;
        case 'signedOut':
          this.autenticacaoStore.fetchData(false);
          break;
        case 'tokenRefresh':
          break;
        case 'tokenRefresh_failure':
          break;
        case 'signInWithRedirect':
          console.log('signInWithRedirect API has successfully been resolved.');
          break;
        case 'signInWithRedirect_failure':
          console.log(
            'failure while trying to resolve signInWithRedirect API.'
          );
          break;
        case 'customOAuthState':
          break;
      }
    });
  }

  ngOnInit(): void {}

  signOut() {
    this.authenticator.signOut();
  }

  isOpen = false;
  visualizarPage(page) {
    this.router.navigate([page]);
    this.isOpen = false;
  }
}
