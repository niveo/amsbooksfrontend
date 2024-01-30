import { Component, Input } from '@angular/core';
import { NzResultModule } from 'ng-zorro-antd/result';
import { Location } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'view-result-component',
  template: `<nz-result
    [nzStatus]="status"
    [nzTitle]="title"
    [nzSubTitle]="subTitle"
  >
    <div nz-result-extra>
      <button nz-button nzType="primary" (click)="back()">Back Home</button>
    </div>
  </nz-result>`,
  imports: [NzResultModule, NzButtonComponent],
  standalone: true,
})
export class ViewResultComponent {
  @Input({ required: true })
  status: 'success' | 'error' | 'info' | 'warning' | '404' | '500' | '403';

  @Input({ required: true })
  title: string;

  @Input()
  subTitle: string;

  constructor(private location: Location) {}
  back() {
    this.location.back();
  }
}
