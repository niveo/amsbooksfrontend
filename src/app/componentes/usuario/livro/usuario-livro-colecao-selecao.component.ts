import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { map, pairwise, startWith, tap } from 'rxjs';
import { ColecaoLivroVinculoService } from 'src/app/services/colecao-livro-vinculo.service';

@Component({
  selector: 'usuario-livro-colecao-selecao-component',
  templateUrl: './usuario-livro-colecao-selecao.component.html',
  styles: `nz-select {width: 100%}`,
  standalone: true,
  imports: [NzSelectModule, FormsModule],
  providers: [ColecaoLivroVinculoService],
})
export class UsuarioLivroColecaoSelecaoComponent implements OnInit {
  @Input({ required: true })
  livroId: number;

  listOfOption: any[] = [];
  listOfSelectedValue = [];

  model = new SelectionModel(true, this.listOfSelectedValue);

  private readonly colecaoLivroService = inject(ColecaoLivroVinculoService);

  ngOnInit(): void {
    this.colecaoLivroService.getAll(this.livroId).subscribe({
      next: (value) => {
        this.listOfSelectedValue = value
          .filter((v) => v.vinculado === 1)
          ?.map((m) => m.id);
        this.listOfOption = value;
      },
    });

    this.model.changed.subscribe((s) => console.log(s));
  }

  change(e: any[]) {
    console.log(this.listOfSelectedValue);
 
  }
}
