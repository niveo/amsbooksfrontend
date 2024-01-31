import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-autenticacao-component',
  templateUrl: './autenticacao.component.html',
  styleUrl: './autenticacao.component.scss',
})
export class AutenticacaoComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.closePopup();
  }

  closePopup() {
    this.router.navigate([{ outlets: { autenticacaoPopup: null } }], {
      relativeTo: this.route.parent,
    });
  }
}
