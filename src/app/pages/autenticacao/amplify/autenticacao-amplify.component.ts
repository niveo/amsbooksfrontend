import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { I18n } from 'aws-amplify/utils';
import { DefaultTexts } from '@aws-amplify/ui';
import { Location } from '@angular/common';

I18n.setLanguage('pt');
I18n.putVocabulariesForLanguage('pt', {
  [DefaultTexts.EMAIL_ADDRESS]: 'E-mail',
  [DefaultTexts.NAME]: 'Nome',
  [DefaultTexts.PASSWORD]: 'Senha',

  [DefaultTexts.SIGN_IN]: 'Entrar',
  [DefaultTexts.SIGN_IN_BUTTON]: 'Entrar',
  [DefaultTexts.SIGN_IN_TAB]: 'Entrar',

  [DefaultTexts.CREATE_ACCOUNT]: 'Criar Conta',

  [DefaultTexts.ENTER_NAME]: 'Digite seu nome',
  [DefaultTexts.ENTER_EMAIL]: 'Digite seu e-mail',
  [DefaultTexts.ENTER_PASSWORD]: 'Digite sua senha',

  [DefaultTexts.CONFIRM_PASSWORD]: 'Confirme sua senha',
  [DefaultTexts.CONFIRM_PASSWORD_PLACEHOLDER]: 'Por favor confirme sua senha',
});

@Component({
  selector: 'app-autenticacao-amplify-component',
  templateUrl: './autenticacao-amplify.component.html',
  styleUrl: './autenticacao-amplify.component.scss',
})
export class AutenticacaoAmplifyComponent {
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.back();
  }

  constructor(private location: Location) {}

  back() {
    this.location.back();
  }
}
