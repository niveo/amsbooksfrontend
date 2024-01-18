import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-page-not-found-component',
  template: `<nz-result
    nzStatus="404"
    nzTitle="404"
    nzSubTitle="Sorry, the page you visited does not exist."
  >
    <div nz-result-extra>
      <button nz-button nzType="primary" (click)="router.navigateByUrl('/')">
        Back Home
      </button>
    </div>
  </nz-result>`,
  standalone: true,
  imports: [NzResultModule],
})
export class PageNotFoundComponent {
  constructor(readonly router: Router) {}
}
