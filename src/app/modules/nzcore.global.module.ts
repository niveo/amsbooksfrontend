import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { IconsProviderUserModule } from './icons-provider-user.module';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

@NgModule({
  imports: [NzTypographyModule, IconsProviderUserModule, NzMessageModule],
  exports: [NzTypographyModule, IconsProviderUserModule, NzMessageModule],
  providers: [NzMessageService],
})
export class NzCoreGlobalModule {}
