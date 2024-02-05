import { Component, Input, inject } from '@angular/core';
import { NzResultModule } from 'ng-zorro-antd/result';
import { Location } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';

@Component({
  selector: 'view-result-component',
  template: `<nz-result
    [nzStatus]="status"
    [nzTitle]="title"
    [nzSubTitle]="subTitle"
  >
    <div nz-result-content>
      {{ content }}
    </div>
    <div nz-result-extra>
      <button nz-button nzType="primary" (click)="back()">
        @if(status === 'error' || status === '500') { Back Home } @else {Back}
      </button>
    </div>
  </nz-result>`,
  imports: [NzResultModule, NzButtonComponent],
  standalone: true,
})
export class ViewResultComponent {
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  @Input({ required: true })
  status: 'success' | 'error' | 'info' | 'warning' | '404' | '500' | '403';

  @Input({ required: true })
  title: string;

  @Input()
  subTitle: string;

  @Input()
  content: string;

  back() {
    if (this.status === 'error' || this.status === '500') {
      this.router.navigate(['/']);
    } else {
      this.location.back();
    }
  }
}
