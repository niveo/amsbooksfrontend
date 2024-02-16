import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userGuard } from 'src/app/guards/user.guard';
import { UsuarioCentroComponent } from './usuario-centro.component';
import { UsuarioCentroPerfilComponent } from './perfil/usuario-centro-perfil.component';
import { UsuarioCentroAutorComponent } from './autor/usuario-centro-autor.component';
import { UsuarioColecaoComponent } from './colecao/usuario-colecao.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioCentroComponent,
    canActivate: [userGuard],
    children: [
      {
        path: 'perfil',
        component: UsuarioCentroPerfilComponent,
      },
      {
        path: 'autor',
        component: UsuarioCentroAutorComponent,
      },
      {
        path: 'colecao',
        component: UsuarioColecaoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioCentroRoutingModule {}
