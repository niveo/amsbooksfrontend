import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  debounce,
  delay,
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
import { BaseStore } from 'src/app/stores/base-store.store';
import { Categoria } from 'src/app/entities/categoria';

@Component({
  selector: 'app-categoria-lista-component',
  templateUrl: './categoria-lista.component.html',
  styleUrls: ['./categoria-lista.component.scss'],
})
export class CategoriaListaComponent extends BaseStore implements OnInit {
  private readonly router = inject(Router);
  private readonly categoriaService = inject(CategoriaService);
  registros$!: Observable<Categoria[]>;
  searchQuery$ = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this.iniciarLoading();
    this.registros$ = combineLatest([
      this.searchQuery$.pipe(debounce(() => timer(1000))),
      of(this.categoriaService.getAll())
        .pipe(delay(300))
        .pipe(finalize(() => this.finalizarLoading())),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(
        mergeMap(([searchQuery, data]) => {
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

  visualizarLivrosCategoria(categoria: Categoria) {
    if (categoria.contalivros)
      this.router.navigate([ROTA_LIVROS, { categoria: categoria.id }]);
  }

  onSearchUpdated(searchQuery: string) {
    this.searchQuery$.next(searchQuery);
  }
}
