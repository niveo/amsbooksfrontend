import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoriaListaComponent } from './categoria-lista.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzFlexModule } from 'ng-zorro-antd/flex'; 
import { NzButtonModule } from 'ng-zorro-antd/button'; 
import { InputPesquisaComponent } from 'src/app/componentes';

@NgModule({
  declarations: [CategoriaListaComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzFlexModule,
    NzListModule,
    NzCardModule,
    NzBadgeModule,

    NzButtonModule,
    NzPageHeaderModule,
    CategoriaRoutingModule,
    NgTemplateOutlet,
    NzSkeletonModule,

    InputPesquisaComponent,
  ],
})
export class CategoriaModule {}
