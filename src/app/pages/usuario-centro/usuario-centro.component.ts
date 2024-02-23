import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EventType, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ColecaoLivroStore } from 'src/app/stores';

@Component({
  selector: 'app-usuario-centro-component',
  templateUrl: './usuario-centro.component.html',
  styleUrl: './usuario-centro.component.scss',
})
export class UsuarioCentroComponent {
  private readonly colecaoLivroStore = inject(ColecaoLivroStore);
  private readonly router = inject(Router);
  data$: Observable<any>;
  visible = true;
  constructor() {
    this.data$ = this.colecaoLivroStore.data$;
    this.router.events.pipe(takeUntilDestroyed()).subscribe((value) => {
      if (value.type === EventType.NavigationStart) {
        this.toogle();
      }
    });
  }

  toogle(): void {
    this.visible = !this.visible;
  }
}
