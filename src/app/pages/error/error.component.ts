import { Component } from '@angular/core';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-error-component',
  template: `<nz-result
    nzStatus="500"
    nzTitle="500"
    nzSubTitle="Sorry, there is an error on server."
  >
    <div nz-result-extra>
      <button nz-button nzType="primary">Back Home</button>
    </div>
  </nz-result>`,
  standalone: true,
  imports: [NzResultModule],
})
export class ErrorComponent {}
