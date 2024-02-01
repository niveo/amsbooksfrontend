import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-autenticacao-amplify-component',
  templateUrl: './autenticacao-amplify.component.html',
  styleUrl: './autenticacao-amplify.component.scss',
})
export class AutenticacaoAmplifyComponent {
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
