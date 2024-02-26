import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  debounce,
  delay,
  finalize,
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
    this.registros$ = combineLatest([
      this.searchQuery$.pipe(debounce(() => timer(1000))),
      of(this.tagService.getAll())
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

  visualizarLivrosTag(tag: Tag) {
    if (tag.contalivros) this.router.navigate([ROTA_LIVROS, { tag: tag.id }]);
  }

  onSearchUpdated(searchQuery: string) {
    this.searchQuery$.next(searchQuery);
  }
}
