import { Component } from '@angular/core';
import { ViewResultComponent } from 'src/app/componentes/view-result.component';

@Component({
  selector: 'app-error-component',
  template: `<view-result-component
    status="500"
    title="500"
    subTitle="Sorry, there is an error on server."
  /> `,
  standalone: true,
  imports: [ViewResultComponent],
})
export class ErrorComponent {}
