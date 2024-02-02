import { NgModule, Optional, SkipSelf } from '@angular/core'; 

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
  }
}
