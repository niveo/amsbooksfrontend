import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  debounce,
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

@Component({
  selector: 'app-tag-tag-component',
  templateUrl: './tag-lista.component.html',
  styleUrls: ['./tag-lista.component.scss'],
})
export class TagListaComponent {
  private readonly router = inject(Router);
  private readonly tagService = inject(TagService);
  loading = true;
  registros$!: Observable<any[]>;
  searchQuery$ = new BehaviorSubject<string>('');

  constructor() {
    this.registros$ = combineLatest([
      this.searchQuery$.pipe(debounce(() => timer(1000))),
      of(this.tagService.getAll()).pipe(finalize(() => (this.loading = false))),
    ])
      .pipe(takeUntilDestroyed())
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

  visualizarLivrosTag(tag) {
    if (tag.contaLivros) this.router.navigate([ROTA_LIVROS, { tag: tag.id }]);
  }

  onSearchUpdated(searchQuery: string) {
    this.searchQuery$.next(searchQuery);
  }
}
