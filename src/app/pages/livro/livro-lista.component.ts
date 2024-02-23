import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { LivroService } from 'src/app/services/livro.service';
import { MonitorErroStore } from 'src/app/stores';

@Component({
  selector: 'app-livro-lista-component',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.scss'],
})
export class LivroListaComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly livroService = inject(LivroService);
  private readonly monitorErroStore = inject(MonitorErroStore);
  protected readonly destroyRef = inject(DestroyRef);
  livros: any[] = [];
  count: number;
  page: number = 0;
  pageSize: number = 10;

  loading = true;

  get pageLimit() {
    return Math.round(this.count / this.pageSize);
  }

  ngOnInit(): void {
    this.carregarRegistros();
  }

  private carregarRegistros() {
    this.loading = true;
    this.livros = [];
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const obs = {};
        params.keys.forEach((key) => {
          obs[key] = params.get(key);
        });
        this.livroService
          .getAll(this.pageSize, this.page, obs)
          .pipe(finalize(() => (this.loading = false)))
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (response) => {
              this.livros = response.results;
              this.count = response.count;
            },
            error: (error) => {
              this.monitorErroStore.notificar(error);
            },
          });
      });
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
