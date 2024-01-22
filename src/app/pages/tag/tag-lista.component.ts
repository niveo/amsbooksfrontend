import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TagService } from '../../services';
import { APP_CONFIG, IConfigToken } from 'src/app/utils/app-config';
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tag-tag-component',
  templateUrl: './tag-lista.component.html',
  styleUrls: ['./tag-lista.component.scss'],
})
export class TagListaComponent implements OnInit {
  categorias$!: Observable<any[]>;
  faSearch = faSearch;
  faClose = faClose;
  inputValue: string | null = null;

  constructor(
    private router: Router,
    private readonly tagService: TagService,
    @Inject(APP_CONFIG) readonly config: IConfigToken
  ) {}

  ngOnInit(): void {
    this.categorias$ = this.tagService.getAll();
  }

  listarListrosTag(tag) {
    this.router.navigate(['/livros', { tag: tag.id }]);
  }
}
