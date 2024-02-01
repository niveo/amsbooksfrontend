import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
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

  livros: any[] = [];
  count: number;
  page: number = 0;
  pageSize: number = 10;

  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;
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
    this.route.paramMap.subscribe((params) => {
      const obs = {};
      params.keys.forEach((key) => {
        obs[key] = params.get(key);
      });
      this.livroService
        .getAll(this.pageSize, this.page, obs)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: (response) => {
            this.livros = response.results;
            this.count = response.count;
          },
          error: () => {
            this.router.navigate(['alerta']);
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
