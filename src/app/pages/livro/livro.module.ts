import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LivroListaComponent } from './livro-lista.component';
import { LivroRoutingModule } from './livro-routing.module';
import { LivroDetalheComponent } from './detalhe/livro-detalhe.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DateDistancePipe, NivelLeituraPipe } from 'src/app/pipes';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'; 
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { LivroLeituraComponent } from './leitura/livro-leitura.component';
import { LivroComentarioComponent } from './comentarios/livro-comentario.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import {
  UsuarioMenuComponent,
  LivroImagemComponent,
} from 'src/app/componentes';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LivroComentarioStore } from 'src/app/stores/livro-comentario.store';
import { LivroComentarioService } from 'src/app/services/livro-comentario.service';
import { LivroHistoricoUsuarioService } from 'src/app/services';
import { LivroDetalheStore } from 'src/app/stores/livro-detalhe.store';
import { LivroHistoricoUsuarioStore } from 'src/app/stores';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { IconsProviderUserModule } from 'src/app/modules/icons-provider-user.module';

@NgModule({
  declarations: [
    LivroListaComponent,
    LivroDetalheComponent,
    LivroLeituraComponent,
    LivroComentarioComponent,
  ],
  imports: [
    CommonModule,
    NzCardModule,
    NzTagModule,
    NzToolTipModule,
    NzEmptyModule,
    NzButtonModule,
    InfiniteScrollModule,
    LivroImagemComponent,
    LivroRoutingModule,
    IconsProviderUserModule,
    NivelLeituraPipe,
    NzPageHeaderModule,
    NzRateModule,
    FormsModule,
    NzCommentModule,
    NzListModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    CommonModule,
    NzAlertModule,
    NzAvatarModule,
    DateDistancePipe,
    NzSpinModule,
    NzSkeletonModule,
    UsuarioMenuComponent,
  ],
  providers: [
    LivroComentarioStore,
    LivroDetalheStore,
    LivroHistoricoUsuarioStore,

    LivroComentarioService,
    LivroHistoricoUsuarioService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LivroModule {}
