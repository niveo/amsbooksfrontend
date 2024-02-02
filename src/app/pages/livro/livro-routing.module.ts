import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivroListaComponent } from './livro-lista.component';
import { LivroDetalheComponent } from './detalhe/livro-detalhe.component';
import { LivroLeituraComponent } from './leitura/livro-leitura.component';

const routes: Routes = [
  {
    path: '',
    component: LivroListaComponent,
  },
  {
    path: ':id',
    component: LivroDetalheComponent,
  },
  {
    path: 'leitura/:id',
    component: LivroLeituraComponent,
    //canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivroRoutingModule {}
