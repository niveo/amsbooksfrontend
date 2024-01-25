import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/notfound/page-not-found.component';
import { ErrorComponent } from './pages/error/error.component';
import { AutenticacaoComponent } from './pages/autenticacao/autenticacao.component';

/*
{
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
},
*/
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
    data: { preload: true },
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./pages/categoria/categoria.module').then(
        (m) => m.CategoriaModule
      ),
    data: { preload: true },
  },
  {
    path: 'tags',
    loadChildren: () =>
      import('./pages/tag/tag.module').then((m) => m.TagModule),
    data: { preload: true },
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'autenticacao',
    component: AutenticacaoComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
