import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  BookOutline,
  UnorderedListOutline,
  TagsOutline,
  MenuOutline,
  HomeOutline,
  UserOutline,
  LogoutOutline,
  WarningFill,
  ProfileOutline,
  SaveOutline,
  PlusOutline,
  ArrowLeftOutline,
  HeartTwoTone,
  HeartOutline,
  DeleteOutline,
} from '@ant-design/icons-angular/icons';

const icons = [
  BookOutline,
  UnorderedListOutline,
  TagsOutline,
  MenuOutline,
  HomeOutline,
  UserOutline,
  LogoutOutline,
  WarningFill,
  ProfileOutline,
  SaveOutline,
  PlusOutline,
  ArrowLeftOutline,
  HeartTwoTone,
  HeartOutline,
  DeleteOutline,
];

@NgModule({
  imports: [NzIconModule.forChild(icons)],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderUserModule {}