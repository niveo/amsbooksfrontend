import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoriaListaComponent } from './categoria-lista.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  declarations: [CategoriaListaComponent],
  exports: [],
  imports: [
    CommonModule,
    NzGridModule,
    NzListModule,
    NzCardModule,
    NzBadgeModule,
    NzPageHeaderModule,
    CategoriaRoutingModule,
    NgTemplateOutlet
  ],
})
export class CategoriaModule {}
