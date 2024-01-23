import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from 'src/app/services/livro.service';
import { APP_CONFIG, IConfigToken } from 'src/app/utils/app-config';

@Component({
  selector: 'app-livro-lista-component',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.scss'],
})
export class LivroListaComponent implements OnInit {
  livros: any[] = [];
  count: number;
  page: number = 0;
  pageSize: number = 10;

  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;

  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly livroService: LivroService,
    @Inject(APP_CONFIG) readonly config: IConfigToken
  ) {}

  get pageLimit() {
    return Math.round(this.count / this.pageSize);
  }

  ngOnInit(): void {
    this.carregarRegistros();
  }

  private carregarRegistros() {
    this.route.paramMap.subscribe((params) => {
      const obs = {};
      params.keys.forEach((key) => {
        obs[key] = params.get(key);
      });
      this.livroService
        .getAll(this.pageSize, this.page, obs)
        .subscribe((response) => {
          this.livros.push(...response.results);
          this.count = response.count;
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
