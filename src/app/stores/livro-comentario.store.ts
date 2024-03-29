import { LivroDetalheStore } from 'src/app/stores/livro-detalhe.store';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, finalize, map } from 'rxjs';
import { LivroComentarioService } from '../services/livro-comentario.service';
import { BaseStore } from './base-store.store';
import { ImagemRemotaService } from '../services';
import { DIRETORIO_IMAGEM_USUARIO } from '../common/constantes';
import { AutenticacaoStore } from './autenticacao.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class LivroComentarioStore extends BaseStore {
  private readonly livroComentarioService = inject(LivroComentarioService);
  private readonly livroDetalheStore = inject(LivroDetalheStore);
  private readonly imagemRemotaService = inject(ImagemRemotaService);
  public readonly autenticacaoStore = inject(AutenticacaoStore);
  private readonly _dataSource = new BehaviorSubject<any[]>([]);
  readonly data$ = this._dataSource.asObservable();
  private readonly _comentarioIdHistoricoSource = new BehaviorSubject<any[]>(
    []
  );
  readonly comentarioIdHistorico$ =
    this._comentarioIdHistoricoSource.asObservable();

  private livroId: number;
  

  constructor() {
    super();
    this.livroDetalheStore.livroId$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((livroId) => {
        this.livroId = livroId;
        this.fetchData();
      });

    this._dataSource.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (!this.autenticacaoStore.authenticated() || !this.livroId) return;

      this.livroComentarioService
        .getComentarioIdLivroUsuario(this.livroId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((data) => this._comentarioIdHistoricoSource.next(data));
    });

    this.autenticacaoStore.usuarioLogado$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.fetchData();
      });
  }

  addComentario(rate: number, texto: string) {
    this.iniciarLoading();

    this.livroComentarioService
      .create({
        livroId: this.livroId,
        rate: rate,
        texto: texto,
      })
      .pipe(finalize(() => this.finalizarLoading()))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this._dataSource.next([response, ...this._dataSource.getValue()]);
        },
        error: () => {},
      });
  }

  fetchData(): void {
    if (!this.livroId) return;
    this.iniciarLoading();
    this.livroComentarioService
      .getAll(this.livroId)
      .pipe(finalize(() => this.finalizarLoading()))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(
        map((response) => {
          response.forEach((element) => {
            element.avatar = this.imagemRemotaService.getUrlPublic(
              `${DIRETORIO_IMAGEM_USUARIO}${element.userId}`
            );
          });
          return response;
        })
      )
      .subscribe({
        next: (response: any[]) => {
          if (!response || response.length === 0) {
            this._dataSource.next([]);
          } else {
            this._dataSource.next(response);
          }
        },
        error: () => {
          this._dataSource.next([]);
        },
      });
  }

  removerComentario(comentarioId: number, idx: number) {
    this.iniciarLoading();
    this.livroComentarioService
      .delete(comentarioId)
      .pipe(finalize(() => this.finalizarLoading()))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          const response = [...this._dataSource.getValue()].splice(idx + 1, 1);
          this._dataSource.next(response);
        },
        error: () => {},
      });
  }
}
