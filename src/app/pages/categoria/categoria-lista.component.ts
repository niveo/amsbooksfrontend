import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriaService } from '../../services';
import { APP_CONFIG, IConfigToken } from 'src/app/utils/app-config';
import { ROTA_LIVROS } from 'src/app/common/constantes';

@Component({
  selector: 'app-categoria-lista-component',
  templateUrl: './categoria-lista.component.html',
  styleUrls: ['./categoria-lista.component.scss'],
})
export class CategoriaListaComponent implements OnInit {
  categorias$!: Observable<any[]>;
  constructor(
    private router: Router,
    private readonly categoriaService: CategoriaService,
    @Inject(APP_CONFIG) readonly config: IConfigToken
  ) {}

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.getAll();
  }

  visualizarLivrosCategoria(categoria) {
    this.router.navigate([ROTA_LIVROS, { categoria: categoria.id }]);
  }
}