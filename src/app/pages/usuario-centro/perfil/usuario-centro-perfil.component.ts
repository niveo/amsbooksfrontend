import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioPerfilStore } from 'src/app/stores/usuario-perfil.store';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { skipNull } from 'src/app/common/rxjs.utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-usuario-centro-perfil-component',
  templateUrl: './usuario-centro-perfil.component.html',
  styleUrl: './usuario-centro-perfil.component.scss',
})
export class UsuarioCentroPerfilComponent {
  private readonly _usuarioPerfilStore = inject(UsuarioPerfilStore);

  loading$: Observable<boolean>;

  validateForm: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.loading$ = this._usuarioPerfilStore.loading$;

    this._usuarioPerfilStore.usuarioPerfil$
      .pipe(takeUntilDestroyed(), skipNull())
      .subscribe({
        next: (value) => {
          this.validateForm.setValue({
            name: value.name,
            email: value.email,
          });
        },
        error(err) {
          console.error(err);
        },
      });
  }

  salvar() {
    this._usuarioPerfilStore.salvar(this.validateForm.value.name);
  }
}
