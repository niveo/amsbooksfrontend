import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-autenticacao-component',
  templateUrl: './autenticacao.component.html',
  styleUrl: './autenticacao.component.scss',
})
export class AutenticacaoComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.closePopup();
  }

  closePopup() {
    this.router.navigate([{ outlets: { autenticacaoPopup: null } }], {
      relativeTo: this.route.parent,
    });
  }
}
