/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { Amplify } from 'aws-amplify';
import { environment } from './environments/environment';

console.log('Produção', environment.production);

if (environment.production) {
  Amplify.configure(JSON.parse(process.env['AMPLIFY_CONFIGURATION']));
} else {
  const config = require('./amplifyconfiguration.json');
  Amplify.configure(config);
}
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
