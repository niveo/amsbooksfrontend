import { NgModule } from '@angular/core';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { AutenticacaoAmplifyComponent } from './autenticacao-amplify.component';
import { AutenticacaoAmplifyRoutingModule } from './autenticacao-amplify-routing.module';

@NgModule({
  declarations: [AutenticacaoAmplifyComponent],
  imports: [AmplifyAuthenticatorModule, AutenticacaoAmplifyRoutingModule],
})
export class AutenticacaoAmplifyModule {}
