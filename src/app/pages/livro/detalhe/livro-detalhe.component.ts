import { Component, Inject } from '@angular/core';
import {
  ActivatedRoute,
  ResolveEnd,
  ResolveStart,
  Router,
} from '@angular/router';
import { APP_CONFIG, IConfigToken } from 'src/app/utils/app-config';
import { Location } from '@angular/common';
import { ROTA_LIVROS } from 'src/app/common/constantes';
import { LivroDetalheStore } from 'src/app/stores';
import { Observable, filter, mapTo, merge } from 'rxjs';

@Component({
  selector: 'app-livro-detalhe-component',
  templateUrl: './livro-detalhe.component.html',
  styleUrl: './livro-detalhe.component.scss',
})
export class LivroDetalheComponent {
  livro$: Observable<any>;
  isLoading$!: Observable<boolean>;

  constructor(
    private readonly route: ActivatedRoute,
    private router: Router,
    private location: Location,
    @Inject(APP_CONFIG) readonly config: IConfigToken,
    private readonly livroDetalheStore: LivroDetalheStore
  ) {}

  ngOnInit() {
    this.livro$ = this.livroDetalheStore.data$;
    this.isLoading$ = this.livroDetalheStore.loading$;

    this.route.paramMap.subscribe((params) => {
      this.livroDetalheStore.fetchData(Number(params.get('id')));
    });
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
