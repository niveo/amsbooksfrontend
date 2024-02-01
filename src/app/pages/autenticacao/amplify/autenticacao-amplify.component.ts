import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { I18n } from 'aws-amplify/utils';
import { DefaultTexts } from '@aws-amplify/ui';

I18n.setLanguage('pt');
I18n.putVocabulariesForLanguage('pt', {
  [DefaultTexts.EMAIL_ADDRESS]: 'E-mail',
  [DefaultTexts.NAME]: 'Nome',
  [DefaultTexts.ENTER_PASSWORD]: 'Digite sua senha',
  [DefaultTexts.CONFIRM_PASSWORD]: 'Confirme sua senha',
  [DefaultTexts.ENTER_NAME]: 'Digite seu nome',
});

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
