import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgModule } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { IconsProviderUserModule } from 'src/app/modules/icons-provider-user.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { UsuarioPerfilImagemComponent } from './perfil/imagem/usuario-perfil-imagem.component';
import { UsuarioCentroRoutingModule } from './usuario-centro-routing.module';
import { UsuarioCentroPerfilComponent } from './perfil/usuario-centro-perfil.component';
import { UsuarioCentroComponent } from './usuario-centro.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { UsuarioCentroAutorComponent } from './autor/usuario-centro-autor.component';
import { UsuarioAutorStore } from 'src/app/stores';
import { AutorService } from 'src/app/services/autor.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [
    UsuarioCentroComponent,
    UsuarioCentroPerfilComponent,
    UsuarioPerfilImagemComponent,
    UsuarioCentroAutorComponent,
  ],
  exports: [],
  imports: [
    UsuarioCentroRoutingModule,
    IconsProviderUserModule,

    NzInputModule,
    NzButtonModule,
    NzUploadModule,
    NzMenuModule,
    NzLayoutModule,
    NzFormModule,
    NzToolTipModule,
    NzSpinModule,

    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [AutorService, UsuarioAutorStore],
})
export class UsuarioCentroModule {}
