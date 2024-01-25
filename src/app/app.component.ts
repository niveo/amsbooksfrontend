import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
import { AutenticacaoStore } from './services/autenticacao.store';
import { Hub } from 'aws-amplify/utils';
import { fetchAuthSession } from 'aws-amplify/auth';
import { sessionStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { getCurrentUser } from 'aws-amplify/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public authenticator: AuthenticatorService,
    private readonly autenticacaoStore: AutenticacaoStore
  ) {
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

  ngOnInit(): void {
    //this.currentSession();
    this.currentAuthenticatedUser();
  }

  async currentSession() {
    try {
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
      console.log(accessToken.toString());
      console.log(idToken.toString());
    } catch (err) {
      console.log(err);
    }
  }

  async currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(signInDetails);
    } catch (err) {
      console.log(err);
    }
  }

  signOut() {
    this.authenticator.signOut();
  }

  isOpen = false;
  visualizarPage(page) {
    this.router.navigate([page]);
    this.isOpen = false;
  }
}
