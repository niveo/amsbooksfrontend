import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColecaoLivroVinculoService } from 'src/app/services/colecao-livro-vinculo.service';
import { pipe, tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MSG_ERRO_PROCESSAR } from 'src/app/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { IconsProviderUserModule } from 'src/app/modules/icons-provider-user.module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-usuario-livro-colecao-tag-component',
  templateUrl: './usuario-livro-colecao-tag.component.html',
  standalone: true,
  imports: [FormsModule, NzTagModule, IconsProviderUserModule],
  providers: [ColecaoLivroVinculoService],
})
export class UsuarioLivroColecaoTagComponent implements OnInit {
  @Input({ required: true })
  livroId: number;

  listOfOption: any[] = [];
  listOfSelectedValue = [];
  listOfSelectedValueCache = [];

  protected readonly destroyRef = inject(DestroyRef);

  private readonly colecaoLivroService = inject(ColecaoLivroVinculoService);

  private readonly nzMessageService = inject(NzMessageService);

  private pipeTapError = () =>
    pipe(
      takeUntilDestroyed(this.destroyRef),
      tap({
        error: (err) => {
          console.error('error', err);
          setTimeout(() => {
            this.nzMessageService.error(MSG_ERRO_PROCESSAR);
          }, 300);
        },
      })
    );

  ngOnInit(): void {
    this.colecaoLivroService
      .getAll(this.livroId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value) => {
          this.listOfOption = value;
          this.listOfSelectedValue = value
            .filter((v) => v.vinculado === 1)
            ?.map((m) => m.id);
          this.listOfSelectedValueCache = [...this.listOfSelectedValue];
        },
      });
  }

  checkChange(checked, item) {
    this.change(checked, item.id);
  }

  private change(checked: boolean, colecaoId: number) {
    if (checked) {
      this.colecaoLivroService
        .create({
          colecaoId: colecaoId,
          livroId: this.livroId,
        })
        .pipe(this.pipeTapError())
        .subscribe({
          error: () => {
            const index = this.listOfSelectedValue.findIndex(
              (i) => i.value === colecaoId
            );
            this.listOfSelectedValue.splice(index, 1);
          },
        });
    } else {
      this.colecaoLivroService
        .delete({
          colecaoId: colecaoId,
          livroId: this.livroId,
        })
        .pipe(this.pipeTapError())
        .subscribe({
          error: () => {
            this.listOfSelectedValue.push(colecaoId);
          },
        });
    }
  }
}
