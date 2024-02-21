import {
  LoadingType,
  SelectModule,
  LoadingModule,
  SelectComponent,
} from 'ng-devui';
import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColecaoLivroVinculoService } from 'src/app/services/colecao-livro-vinculo.service';
import { Observable, pipe, tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MSG_ERRO_PROCESSAR } from 'src/app/common';

@Component({
  selector: 'usuario-livro-colecao-selecao-component',
  templateUrl: './usuario-livro-colecao-selecao.component.html',
  styles: `nz-select {width: 100%}`,
  standalone: true,
  imports: [FormsModule, LoadingModule, SelectModule],
  providers: [ColecaoLivroVinculoService],
})
export class UsuarioLivroColecaoSelecaoComponent implements OnInit {
  @Input({ required: true })
  livroId: number;

  options = [];
  select1 = [];

  selectCache = new Set();

  loading: LoadingType;
  source = new Observable();

  @ViewChild('networkSearchSelect') selectComponent: SelectComponent;

  private readonly colecaoLivroService = inject(ColecaoLivroVinculoService);

  private readonly nzMessageService = inject(NzMessageService);

  pipeTapError = (id: number) =>
    pipe(
      tap({
        error: (err) => {
          console.error('error', err);
          setTimeout(() => {
            this.msgErroReset();
          }, 300);
        },
        next: () => {
          this.selectCache.has(id)
            ? this.selectCache.delete(id)
            : this.selectCache.add(id);
        },
      })
    );

  ngOnInit(): void {
    this.colecaoLivroService.getAll(this.livroId).subscribe({
      next: (value) => {
        this.options = value?.map((m) => {
          return { name: m.descricao, value: m.id };
        });
        this.select1 = value
          .filter((v) => v.vinculado === 1)
          ?.map((m) => {
            this.selectCache.add(m.id);

            return { name: m.descricao, value: m.id };
          });
      },
    });
  }

  change(e: any) {
    if (!this.selectCache.has(e.value)) {
      this.loading = this.colecaoLivroService
        .create({
          colecaoId: e.value,
          livroId: this.livroId,
        })
        .pipe(this.pipeTapError(e.id))
        .subscribe({
          error: () => {
            const index = this.select1.findIndex((i) => i.value === e.value);
            this.select1.splice(index, 1);
          },
        });
    } else {
      this.loading = this.colecaoLivroService
        .delete({
          colecaoId: e.value,
          livroId: this.livroId,
        })
        .pipe(this.pipeTapError(e.id))
        .subscribe({
          error: () => {
            this.select1.push(e);
          },
        });
    }
  }

  msgErroReset() {
    this.selectComponent.resetStatus();
    this.selectComponent.resetSource();
    this.nzMessageService.error(MSG_ERRO_PROCESSAR);
  }
}
