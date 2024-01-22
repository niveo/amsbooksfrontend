import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { TagListaComponent } from './tag-lista.component';

const routes: Routes = [
  {
    path: '',
    component: TagListaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagRoutingModule {}
