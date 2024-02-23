import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  debounce,
  filter,
  finalize,
  from,
  iif,
  map,
  mergeMap,
  of,
  timer,
} from 'rxjs';
import { CategoriaService } from '../../services';
import { ROTA_LIVROS } from 'src/app/common/constantes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-categoria-lista-component',
  templateUrl: './categoria-lista.component.html',
  styleUrls: ['./categoria-lista.component.scss'],
})
export class CategoriaListaComponent {
  private readonly router = inject(Router);
  private readonly categoriaService = inject(CategoriaService);
  loading = true;
  registros$!: Observable<any[]>;
  searchQuery$ = new BehaviorSubject<string>('');

  constructor() {
    this.registros$ = combineLatest([
      this.searchQuery$.pipe(debounce(() => timer(1000))),
      of(this.categoriaService.getAll()).pipe(
        finalize(() => (this.loading = false))
      ),
    ])
      .pipe(takeUntilDestroyed())
      .pipe(
        mergeMap(([searchQuery, data]) => {
          console.log(searchQuery);

          return iif(
            () => searchQuery === '',
            data,
            data.pipe(
              map((m) => {
                return m.filter(
                  (x) =>
                    x.nome.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
                    -1
                );
              })
            )
          );
        })
      );
  }

  visualizarLivrosCategoria(categoria) {
    if (categoria.contaLivros)
      this.router.navigate([ROTA_LIVROS, { categoria: categoria.id }]);
  }

  onSearchUpdated(searchQuery: string) {
    this.searchQuery$.next(searchQuery);
  }
}
