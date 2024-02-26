import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, finalize, iif, mergeMap, of } from 'rxjs';
import { CategoriaService } from '../../services';
import { ROTA_LIVROS } from 'src/app/common/constantes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseStore } from 'src/app/stores/base-store.store';
import { Categoria } from 'src/app/entities/categoria';
import { MSG_ERRO_CARREGAR } from 'src/app/common';

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

  ngOnInit() {
    this.iniciarLoading();

    this.categoriaService
      .getAll()
      .pipe(finalize(() => this.finalizarLoading()))
      .subscribe({
        next: (registros) => {
          this.registros$ = this.searchQuery$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .pipe(
              mergeMap((searchQuery) => {
                return iif(
                  () => searchQuery === '',
                  of(registros),
                  of(
                    registros.filter(
                      (x) =>
                        x.nome
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
                    )
                  )
                );
              })
            );
        },
        error: (err) => {
          console.error(err);
          this.enviarMensagem('error', MSG_ERRO_CARREGAR);
        },
      });
  }

  visualizarLivrosCategoria(categoria: Categoria) {
    if (categoria.contalivros)
      this.router.navigate([ROTA_LIVROS, { categoria: categoria.id }]);
  }

  onSearchUpdated(searchQuery: string) {
    this.searchQuery$.next(searchQuery);
  }
}
