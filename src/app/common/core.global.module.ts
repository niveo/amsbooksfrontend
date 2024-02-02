import { NgModule, Optional, SkipSelf } from '@angular/core'; 
import { Amplify } from 'aws-amplify';
import awsExports from '../../aws-exports';

@NgModule({
  imports: [],
  exports: [],
})
export class CoreGlobalModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreGlobalModule) {
    if (parentModule) {
      throw new Error(
        'CoreDateModule is already loaded. Import only in AppModule'
      );
    }
    Amplify.configure(awsExports);
  }
}
