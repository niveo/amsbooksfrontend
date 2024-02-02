import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoAmplifyComponent } from './autenticacao-amplify.component';

const routes: Routes = [
  {
    path: '',
    component: AutenticacaoAmplifyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutenticacaoAmplifyRoutingModule {}
