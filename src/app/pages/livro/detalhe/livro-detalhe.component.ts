import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ROTA_LIVROS } from 'src/app/common/constantes';
import { LivroDetalheStore } from 'src/app/stores';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-livro-detalhe-component',
  templateUrl: './livro-detalhe.component.html',
  styleUrl: './livro-detalhe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LivroDetalheComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly livroDetalheStore = inject(LivroDetalheStore);

  livro$: Observable<any>;
  isLoading$!: Observable<boolean>;

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
