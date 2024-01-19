import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/notfound/page-not-found.component';
import { ErrorComponent } from './pages/error/error.component';

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
    redirectTo: '/livro',
  },
  {
    path: 'livro',
    loadChildren: () =>
      import('./pages/livro/livro.module').then((m) => m.LivroModule),
    data: { preload: true },
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
