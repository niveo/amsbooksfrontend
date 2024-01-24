import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
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
import {
  ArrowLeftOutline,
  HeartTwoTone,
  HeartOutline,
} from '@ant-design/icons-angular/icons';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { LivroLeituraComponent } from './leitura/livro-leitura.component';
import { LivroComentarioComponent } from './comentarios/livro-comentario.component';

@NgModule({
  declarations: [
    LivroListaComponent,
    LivroDetalheComponent,
    LivroLeituraComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    NzCardModule,
    NzTagModule,
    NzToolTipModule,
    NzEmptyModule,
    NzButtonModule,
    InfiniteScrollModule,
    ImagemComponent,
    LivroRoutingModule,
    LivroComentarioComponent,
    NzIconModule.forChild([ArrowLeftOutline, HeartTwoTone, HeartOutline]),
    NivelLeituraPipe,
    NzPageHeaderModule,
  ],
})
export class LivroModule {}
