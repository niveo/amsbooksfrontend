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
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { HttpsRequestInterceptor } from './interceptors/requests.interceptor';
import { APP_CONFIG } from './utils/app-config';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { DEFAULT_TIMEOUT } from './common/tokens';
import { LivroModule } from './pages/livro/livro.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { TagModule } from './pages/tag/tag.module';
import { CategoriaModule } from './pages/categoria/categoria.module';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { OverlayModule } from '@angular/cdk/overlay';

import {
  BookOutline,
  UnorderedListOutline,
  TagsOutline,
  MenuOutline,
  HomeOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';

import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
import {
  AmplifyAuthenticatorModule,
  translations,
} from '@aws-amplify/ui-angular';
import amplifyconfig from '../amplifyconfiguration.json';
Amplify.configure(amplifyconfig);
I18n.putVocabularies(translations);
I18n.setLanguage('pt');

registerLocaleData(pt);
registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ErrorComponent,
    PageNotFoundComponent,
    CommonModule,
    AmplifyAuthenticatorModule,

    NzIconModule.forRoot([
      BookOutline,
      UnorderedListOutline,
      TagsOutline,
      MenuOutline,
      HomeOutline,
      UserOutline,
    ]),
    NzMenuModule,
    NzButtonModule,
    NzAvatarModule,
    NzToolTipModule,
    NzLayoutModule,

    LivroModule,
    TagModule,
    CategoriaModule,

    OverlayModule,

    AuthModule.forRoot({
      ...environment.auth,
      httpInterceptor: {
        ...environment.httpInterceptor,
      },
    }),
  ],
  providers: [
    { provide: APP_CONFIG, useValue: environment },
    { provide: DEFAULT_TIMEOUT, useValue: 30000 },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
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
