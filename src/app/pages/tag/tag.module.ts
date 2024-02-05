import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { TagListaComponent } from './tag-lista.component';
import { TagRoutingModule } from './tag-routing.module';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@NgModule({
  declarations: [TagListaComponent],
  exports: [],
  imports: [
    CommonModule,
    NzGridModule,
    NzListModule,
    NzCardModule,
    NzBadgeModule,
    TagRoutingModule,
    NgTemplateOutlet,
    NzSkeletonModule
  ],
})
export class TagModule {}
