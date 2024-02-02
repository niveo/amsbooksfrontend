import { Component } from '@angular/core';
import { ViewResultComponent } from 'src/app/componentes/view-result.component';
@Component({
  selector: 'app-alerta-component',
  template: `<view-result-component
    status="warning"
    title="There are some problems with your operation"
  /> `,
  standalone: true,
  imports: [ViewResultComponent],
})
export class AlertaComponent {}
