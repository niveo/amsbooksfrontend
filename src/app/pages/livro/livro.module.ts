import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LivroListaComponent } from './livro-lista.component';
import { LivroRoutingModule } from './livro-routing.module';
import { LivroDetalheComponent } from './detalhe/livro-detalhe.component';
import { ImagemComponent } from 'src/app/componentes/imagem.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NivelLeituraPipe } from 'src/app/pipes';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ArrowLeftOutline } from '@ant-design/icons-angular/icons';
@NgModule({
  declarations: [LivroListaComponent, LivroDetalheComponent],
  exports: [],
  imports: [
    CommonModule,
    NzListModule,
    NzCardModule,
    NzGridModule,
    NzTagModule,
    NzToolTipModule,
    NzButtonModule,
    InfiniteScrollModule,
    ImagemComponent,
    LivroRoutingModule,
    NzIconModule.forChild([ArrowLeftOutline]),
    NivelLeituraPipe,
    NzPageHeaderModule,
  ],
})
export class LivroModule {}
