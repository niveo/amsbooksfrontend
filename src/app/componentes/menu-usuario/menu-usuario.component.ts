import { AutenticacaoStore } from 'src/app/stores';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { ImagemRemotaService } from 'src/app/services';
import { UsuarioPerfilStore } from 'src/app/stores/usuario-perfil.store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-menu-usuario-component',
  templateUrl: './menu-usuario.component.html',
  styleUrl: './menu-usuario.component.scss',
  standalone: true,
  imports: [
    NzAvatarModule,
    NzPopoverModule,
    NzButtonModule,
    NzDividerModule,
    AsyncPipe,
  ],
})
export class MenuUsuarioComponent implements OnInit {
  visible: boolean = false;
  srcImagem: string;
  usuarioPerfil$: Observable<any>;

  constructor(
    private readonly router: Router,
    public readonly authenticator: AuthenticatorService,
    private readonly imagemRemotaService: ImagemRemotaService,
    private readonly usuarioPerfilStore: UsuarioPerfilStore
  ) {}

  ngOnInit(): void {
    this.usuarioPerfil$ = this.usuarioPerfilStore.usuarioPerfil$;

    this.imagemRemotaService
      .obterUrl(this.authenticator.user.userId, 'private')
      .subscribe((url) => (this.srcImagem = url));
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
