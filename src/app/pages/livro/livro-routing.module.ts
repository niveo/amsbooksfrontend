import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { LivroListaComponent } from './livro-lista.component';
import { LivroDetalheComponent } from './detalhe/livro-detalhe.component';
import { LivroService } from 'src/app/services/livro.service';

const lisvroDetalheResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  return inject(LivroService).getLivroDetalhe(
    Number(route.paramMap.get('id')!)
  );
};

const routes: Routes = [
  {
    path: '',
    component: LivroListaComponent,
  },
  {
    path: 'detalhe/:id',
    component: LivroDetalheComponent,
    resolve: {
      data: lisvroDetalheResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivroRoutingModule {}
