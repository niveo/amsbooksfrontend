import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { TagService } from '../../services';
import { ROTA_LIVROS } from 'src/app/common/constantes';

@Component({
  selector: 'app-tag-tag-component',
  templateUrl: './tag-lista.component.html',
  styleUrls: ['./tag-lista.component.scss'],
})
export class TagListaComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly tagService = inject(TagService);
  loading = true;
  categorias$!: Observable<any[]>;
  inputValue: string | null = null;

  ngOnInit(): void {
    this.loading = true;
    this.categorias$ = this.tagService
      .getAll()
      .pipe(finalize(() => (this.loading = false)));
  }

  visualizarLivrosTag(tag) {
    if (tag.contaLivros) this.router.navigate([ROTA_LIVROS, { tag: tag.id }]);
  }
}
