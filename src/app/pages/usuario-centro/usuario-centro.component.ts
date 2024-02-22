import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ColecaoLivroStore } from 'src/app/stores';

@Component({
  selector: 'app-usuario-centro-component',
  templateUrl: './usuario-centro.component.html',
  styleUrl: './usuario-centro.component.scss',
})
export class UsuarioCentroComponent {
  private readonly colecaoLivroStore = inject(ColecaoLivroStore);
  data$: Observable<any>;
  constructor() {
    this.data$ = this.colecaoLivroStore.data$;
  } 
}
