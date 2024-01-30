import { Component, Input, ViewEncapsulation } from '@angular/core';

//    [nzSrc]="user.avatar"
@Component({
  selector: 'app-avatar-usuario-component, [app-avatar-usuario-component]',
  template: `<nz-avatar nz-comment-avatar  nzIcon="user"></nz-avatar>` ,
  encapsulation: ViewEncapsulation.Emulated
})
export class AvatarUsuarioComponent {
  @Input({ required: true })
  usuarioId: number;
}
