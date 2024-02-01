import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { UsuarioPerfilStore } from 'src/app/stores/usuario-perfil.store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { PerfilUsuario } from 'src/app/model';

@Component({
  selector: 'app-usuario-menu-component',
  templateUrl: './usuario-menu.component.html',
  styleUrl: './usuario-menu.component.scss',
  standalone: true,
  imports: [
    NzAvatarModule,
    NzPopoverModule,
    NzButtonModule,
    NzDividerModule,
    AsyncPipe,
    NzSpinModule,
  ],
})
export class UsuarioMenuComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authenticator = inject(AuthenticatorService);
  private readonly usuarioPerfilStore = inject(UsuarioPerfilStore);

  visible: boolean = false;
  usuarioPerfil$: Observable<PerfilUsuario>;

  ngOnInit(): void {
    this.usuarioPerfil$ = this.usuarioPerfilStore.usuarioPerfil$;
  }

  perfilUsuario() {
    this.visible = false;
    this.router.navigate(['perfil']);
  }

  logOut() {
    this.visible = false;
    this.authenticator.signOut();
  }
}
