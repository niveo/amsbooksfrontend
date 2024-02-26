import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/notfound/page-not-found.component';
import { ErrorComponent } from './pages/error/error.component';
import { AlertaComponent } from './pages/alerta/alerta.component'; 

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
    path: 'autor',
    loadChildren: () =>
      import('./pages/autor/autor.module').then((m) => m.AutorModule),
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./pages/usuario-centro/usuario-centro.module').then(
        (m) => m.UsuarioCentroModule
      ),
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
    outlet: 'autenticacaoPopup',
    loadChildren: () =>
      import('./pages/autenticacao/amplify/autenticacao-amplify.module').then(
        (m) => m.AutenticacaoAmplifyModule
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
