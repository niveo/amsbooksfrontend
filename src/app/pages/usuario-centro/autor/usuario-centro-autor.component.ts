import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { skipNull } from 'src/app/common/rxjs.utils';
import { UsuarioAutorStore } from 'src/app/stores';

@Component({
  selector: 'app-usuario-centro-autor-component',
  templateUrl: './usuario-centro-autor.component.html',
  styleUrl: './usuario-centro-autor.component.scss',
})
export class UsuarioCentroAutorComponent implements OnInit {
  private readonly usuarioAutorStore = inject(UsuarioAutorStore);
  loading$: Observable<boolean>;

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

    this.loading$ = this.usuarioAutorStore.loading$;

    this.usuarioAutorStore.data$.pipe(skipNull()).subscribe({
      next: (value) => {
        if (value.nome) this.validateForm.get('nome').setValue(value.nome);
        if (value.descricao)
          this.validateForm.get('descricao').setValue(value.descricao);
        if (value.url) this.validateForm.get('url').setValue(value.url);
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
