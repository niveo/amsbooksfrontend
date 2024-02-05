import { environment } from './../environments/environment';
import { LOCALE_ID, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { pt_BR, en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import en from '@angular/common/locales/en';

import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './pages/error/error.component';
import { PageNotFoundComponent } from './pages/notfound/page-not-found.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { HttpsRequestInterceptor } from './interceptors/requests.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import {
  DEFAULT_TIMEOUT,
  TOKEN_APP_CONFIG,
  TOKEN_CARREGAR_IMAGEM_REMOTA,
} from './common/tokens';
import { LivroModule } from './pages/livro/livro.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { TagModule } from './pages/tag/tag.module';
import { CategoriaModule } from './pages/categoria/categoria.module';
import { OverlayModule } from '@angular/cdk/overlay'; 
import { UsuarioPerfilLogarComponent } from './componentes';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { UsuarioPerfilComponent } from './pages/usuario/perfil/usuario-perfil.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { UsuarioPerfilImagemComponent } from './pages/usuario/perfil/imagem/usuario-perfil-imagem.component';

import { IconsProviderUserModule } from './modules/icons-provider-user.module';
import { VersaoSistemaDirective } from './directives/versao-sistema.directive';

registerLocaleData(pt);
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    UsuarioPerfilComponent,
    UsuarioPerfilImagemComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ErrorComponent,
    PageNotFoundComponent,

    CommonModule,
    UsuarioPerfilLogarComponent,
    VersaoSistemaDirective,

    IconsProviderUserModule,

    NzMenuModule,
    NzButtonModule,
    NzAvatarModule,
    NzToolTipModule,
    NzLayoutModule,
    NzToolTipModule,
    NzModalModule,
    NzUploadModule,
    NzSpaceModule,
    NzInputModule,
    NzSpinModule,

    LivroModule,
    TagModule,
    CategoriaModule,
 
    OverlayModule,
  ],
  providers: [
    { provide: TOKEN_APP_CONFIG, useValue: environment },
    {
      provide: TOKEN_CARREGAR_IMAGEM_REMOTA,
      useValue: environment.carregarImagemRemota,
    },
    { provide: DEFAULT_TIMEOUT, useValue: 30000 },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    {
      provide: Window,
      useValue: window,
    },
    { provide: LOCALE_ID, useValue: 'en_US' },
    {
      provide: NZ_I18N,
      useFactory: () => {
        const localId = inject(LOCALE_ID);
        switch (localId) {
          case 'en':
            return en_US;
          /** keep the same with angular.json/i18n/locales configuration **/
          case 'pt':
            return pt_BR;
          default:
            return pt_BR;
        }
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
