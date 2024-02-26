import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
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
  @ViewChild('outlet') outlet;

  constructor() {
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


  //https://stackoverflow.com/questions/63355407/angular-9-cannot-deactivate-router-outlet-on-lazy-loaded-module
  onActiveOutlet(component: Component) {
    let previousUrl = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (
          previousUrl != this.router.url &&
          previousUrl.includes(this.router.url)
        ) {
          this.outlet.deactivate();
        }
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
