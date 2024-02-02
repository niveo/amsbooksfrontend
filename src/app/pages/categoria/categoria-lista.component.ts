import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  categorias$!: Observable<any[]>;

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.getAll();
  }

  visualizarLivrosCategoria(categoria) {
    this.router.navigate([ROTA_LIVROS, { categoria: categoria.id }]);
  }
}
