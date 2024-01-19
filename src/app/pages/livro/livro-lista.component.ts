import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    private readonly livroService: LivroService,
    @Inject(APP_CONFIG) readonly config: IConfigToken
  ) {}

  ngOnInit(): void {
    this.livros$ = this.livroService.getAll();
    console.log(this.livros$);
  }

  detalharLivro(livro) {
    this.router.navigate(['livro/detalhe/' + livro.id]);
  }
}
