import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { LivroService } from 'src/app/services/livro.service';
import { APP_CONFIG, IConfigToken } from 'src/app/utils/app-config';

@Component({
  selector: 'app-livro-lista-component',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.scss'],
})
export class LivroListaComponent implements OnInit {
  livros$!: Observable<any[]>;

  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly livroService: LivroService,
    @Inject(APP_CONFIG) readonly config: IConfigToken
  ) {}

  ngOnInit(): void {
    console.log(this.route.params);

    this.livros$ = this.livroService.getAll();
  }

  detalharLivro(livro) {
    this.router.navigate(['livros/' + livro.id]);
  }
}

//https://dev.to/krivanek06/angular-infinite-scrolling-2jab