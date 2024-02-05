import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { CategoriaService } from '../../services';
import { ROTA_LIVROS } from 'src/app/common/constantes';

@Component({
  selector: 'app-categoria-lista-component',
  templateUrl: './categoria-lista.component.html',
  styleUrls: ['./categoria-lista.component.scss'],
})
export class CategoriaListaComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly categoriaService = inject(CategoriaService);
  loading = true;
  categorias$!: Observable<any[]>;

  ngOnInit(): void {
    this.loading = true;
    this.categorias$ = this.categoriaService
      .getAll()
      .pipe(finalize(() => (this.loading = false)));
  }

  visualizarLivrosCategoria(categoria) {
    if (categoria.contalivros)
      this.router.navigate([ROTA_LIVROS, { categoria: categoria.id }]);
  }
}
