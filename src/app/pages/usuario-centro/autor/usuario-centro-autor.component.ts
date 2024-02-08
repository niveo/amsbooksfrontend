import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { UsuarioAutorStore } from 'src/app/stores';

@Component({
  selector: 'app-usuario-centro-autor-component',
  templateUrl: './usuario-centro-autor.component.html',
  styleUrl: './usuario-centro-autor.component.scss',
})
export class UsuarioCentroAutorComponent implements OnInit {
  private readonly usuarioAutorStore = inject(UsuarioAutorStore);

  validateForm: FormGroup<{
    nome: FormControl<string>;
    url: FormControl<string>;
    descricao: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      nome: ['', [Validators.required]],
      url: [''],
      descricao: [
        '',
        [Validators.required, Validators.max(300), Validators.maxLength(300)],
      ],
    });

    this.usuarioAutorStore.data$.subscribe({
      next(value) {
        console.log(value);
      },
      error(err) {
        console.error(err);
      },
    });
  }

  ngOnInit(): void {
    this.usuarioAutorStore.carregarDados();
  }

  copiarNomeDoUsuario() {
    this.usuarioAutorStore.copiarNomeDoUsuario();
  }

  salvar() {
    this.usuarioAutorStore.salvar(
      this.validateForm.get('nome').value,
      this.validateForm.get('descricao').value,
      this.validateForm.get('url').value
    );
  }
}
