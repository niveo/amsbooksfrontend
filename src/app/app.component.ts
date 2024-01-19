import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faTags, faBook, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  faTags = faTags;
  faBook = faBook;
  faList = faList;

  constructor(private router: Router) {}

  visualizarPage(page) {
    this.router.navigate([page]);
  }
}
