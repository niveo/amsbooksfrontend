import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_CONFIG, IConfigToken } from 'src/app/utils/app-config';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
@Component({
  selector: 'app-livro-detalhe-component',
  templateUrl: './livro-detalhe.component.html',
})
export class LivroDetalheComponent {
  faArrowLeft = faArrowLeft;
  livro: any;
  constructor(
    private readonly route: ActivatedRoute,
    private router: Router,
    private location: Location,
    @Inject(APP_CONFIG) readonly config: IConfigToken
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ data }) => (this.livro = data));
  }

  visualizarLivrosTag(tag: any) {}

  onBack(){
    this.location.back();
  }
}
