import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  debounce,
  delay,
  finalize,
  from,
  iif,
  map,
  mergeMap,
  of,
  timer,
} from 'rxjs';
import { TagService } from '../../services';
import { ROTA_LIVROS } from 'src/app/common/constantes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseStore } from 'src/app/stores/base-store.store';
import { Tag } from 'src/app/entities/tag';
import { MSG_ERRO_CARREGAR } from 'src/app/common';

@Component({
  selector: 'app-tag-tag-component',
  templateUrl: './tag-lista.component.html',
  styleUrls: ['./tag-lista.component.scss'],
})
export class TagListaComponent extends BaseStore implements OnInit {
  private readonly router = inject(Router);
  private readonly tagService = inject(TagService);
  registros$!: Observable<Tag[]>;
  searchQuery$ = new BehaviorSubject<string>('');

  ngOnInit() {
    this.iniciarLoading();

    this.tagService
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

  visualizarLivrosTag(tag: Tag) {
    if (tag.contalivros) this.router.navigate([ROTA_LIVROS, { tag: tag.id }]);
  }

  onSearchUpdated(searchQuery: string) {
    this.searchQuery$.next(searchQuery);
  }
}
