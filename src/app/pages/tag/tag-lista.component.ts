import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  
  categorias$!: Observable<any[]>;
  inputValue: string | null = null;

  ngOnInit(): void {
    this.categorias$ = this.tagService.getAll();
  }

  visualizarLivrosTag(tag) {
    this.router.navigate([ROTA_LIVROS, { tag: tag.id }]);
  }
}
