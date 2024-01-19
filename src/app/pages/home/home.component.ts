import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../../entities/livro';
import { LivroService } from '../../services/livro.service';
import { APP_CONFIG, IConfigToken } from '../../utils/app-config';

@Component({
  selector: 'app-home-componenet',
  templateUrl: './home.component.html',
  styles: [
    `
      :host {
        padding: 10px;
        display: flex;
      }
    `,
  ],
})
export class HomeComponent  {
  
}
