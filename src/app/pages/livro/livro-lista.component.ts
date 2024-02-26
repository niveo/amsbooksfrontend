import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, finalize, from, map, mergeMap, tap } from 'rxjs';
import { MSG_ERRO_CARREGAR } from 'src/app/common';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-lista-component',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.scss'],
})
export class LivroListaComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly livroService = inject(LivroService);
  protected readonly destroyRef = inject(DestroyRef);
  private readonly nzMessageService = inject(NzMessageService);

  count: number;
  page: number = 0;
  pageSize: number = 10;
  loading = true;
  registros$!: Observable<any[]>;

  get pageLimit() {
    return Math.round(this.count / this.pageSize);
  }

  ngOnInit(): void {
    this.carregarRegistros();
  }

  private carregarRegistros() {
    this.loading = true;
    this.registros$ = this.route.paramMap
      .pipe(
        map((params) => {
          const obs = {};
          params.keys.forEach((key) => {
            obs[key] = params.get(key);
          });
          return obs;
        }),
        mergeMap((params) => {
          return from(
            this.livroService.getAll(this.pageSize, this.page, params).pipe(
              finalize(() => (this.loading = false)),
              takeUntilDestroyed(this.destroyRef)
            )
          );
        }),

        map((data) => {
          this.count = data.count;
          return data.results;
        })
      )

      .pipe(
        tap({
          error: (err) => {
            console.error('error', err);
            setTimeout(() => {
              this.nzMessageService.error(MSG_ERRO_CARREGAR);
            }, 300);
          },
        }),
        takeUntilDestroyed(this.destroyRef)
      );
  }

  detalharLivro(livro) {
    this.router.navigate(['livros/' + livro.id]);
  }

  onScrollDown() {
    if (this.page <= this.pageLimit) {
      this.page++;
      this.carregarRegistros();
    }
  }
}
