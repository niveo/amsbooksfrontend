import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public authenticator: AuthenticatorService
  ) {
    Amplify.configure(awsExports);
  }

  ngOnInit(): void {
    this.authenticator.subscribe(ev => {
      console.log(ev);
      
    })
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
