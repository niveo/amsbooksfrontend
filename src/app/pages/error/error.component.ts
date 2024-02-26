import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewResultComponent } from 'src/app/componentes/view-result.component';

@Component({
  selector: 'app-error-component',
  template: `<view-result-component
    status="500"
    title="500"
    subTitle="Sorry, there is an error on server."
    [content]="content"
  /> `,
  standalone: true,
  imports: [ViewResultComponent],
})
export class ErrorComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  content: string;

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((msg) => {
        this.content = msg.get('erro');
      }) ;
  }
}
