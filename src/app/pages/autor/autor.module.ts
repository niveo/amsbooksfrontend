import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutorRoutingModule } from './autor-routing.module';
import { AutorComponent } from './autor.component';

@NgModule({
  declarations: [AutorComponent],
  exports: [],
  imports: [CommonModule, AutorRoutingModule],
})
export class AutorModule {}
