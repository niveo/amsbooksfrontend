import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_CONFIG, IConfigToken } from 'src/app/utils/app-config';
import { Location } from '@angular/common';
import { ROTA_LIVROS } from 'src/app/common/constantes';

@Component({
  selector: 'app-livro-detalhe-component',
  templateUrl: './livro-detalhe.component.html',
  styleUrl: './livro-detalhe.component.scss',
})
export class LivroDetalheComponent {
  livro: any;
  constructor(
    private readonly route: ActivatedRoute,
    private router: Router,
    private location: Location,
    @Inject(APP_CONFIG) readonly config: IConfigToken
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ data }) => (this.livro = data));
  }

  visualizarLivrosTag(tag: any) {
    this.router.navigate([ROTA_LIVROS, { tag: tag.id }]);
  }

  visualizarLivrosCategoria(categoria) {
    this.router.navigate([ROTA_LIVROS, { categoria: categoria.id }]);
  }

  onBack() {
    this.location.back();
  }
}