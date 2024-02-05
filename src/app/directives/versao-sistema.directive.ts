import { Directive, ElementRef, Inject, inject } from '@angular/core';
import { TOKEN_APP_CONFIG } from '../common';

@Directive({
  selector: '[versaosis]',
  standalone: true,
})
export class VersaoSistemaDirective {
  private readonly config = inject(TOKEN_APP_CONFIG);
  constructor(el: ElementRef) {
    el.nativeElement.innerText = this.config.versaoSistemaDescricao;
  }
}
