import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/notfound/page-not-found.component';
import { ErrorComponent } from './pages/error/error.component'; 
import { AlertaComponent } from './pages/alerta/alerta.component';
import { UsuarioPerfilComponent } from './pages/usuario/perfil/usuario-perfil.component';
import { userGuard } from './guards/user.guard';
import { AutenticacaoAmplifyComponent } from './pages/autenticacao/amplify/autenticacao-amplify.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/livros',
  },
  {
    path: 'livros',
    loadChildren: () =>
      import('./pages/livro/livro.module').then((m) => m.LivroModule),
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./pages/categoria/categoria.module').then(
        (m) => m.CategoriaModule
      ),
  },
  {
    path: 'perfil',
    component: UsuarioPerfilComponent,
    canActivate: [userGuard],
  },
  {
    path: 'tags',
    loadChildren: () =>
      import('./pages/tag/tag.module').then((m) => m.TagModule),
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'alerta',
    component: AlertaComponent,
  },
  {
    path: 'autenticacao',
    component: AutenticacaoAmplifyComponent,
    outlet: 'autenticacaoPopup',
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
