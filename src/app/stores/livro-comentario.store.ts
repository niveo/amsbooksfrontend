import { LivroDetalheStore } from 'src/app/stores/livro-detalhe.store';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, finalize, map } from 'rxjs';
import { LivroComentarioService } from '../services/livro-comentario.service';
import { BaseLoadingStore } from './base-loading.store';
import { ImagemRemotaService } from '../services';
import { DIRETORIO_IMAGEM_USUARIO } from '../common/constantes';

@Injectable()
export class LivroComentarioStore extends BaseLoadingStore {
  private readonly livroComentarioService = inject(LivroComentarioService);
  private readonly livroDetalheStore = inject(LivroDetalheStore);
  private readonly imagemRemotaService = inject(ImagemRemotaService);

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
    this.livroDetalheStore.livroId$.subscribe((livroId) => {
      if (livroId) {
        this.livroId = livroId;
        this.fetchData();
      }
    });

    this._dataSource.subscribe(() => {
      this.livroComentarioService
        .getComentarioIdLivroUsuario(this.livroId)
        .subscribe((data) => this._comentarioIdHistoricoSource.next(data));
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
      .subscribe({
        next: (response) => {
          this._dataSource.next([response, ...this._dataSource.getValue()]);
        },
        error: () => {},
      });
  }

  fetchData(): void {
    this.iniciarLoading();
    this.livroComentarioService
      .getAll(this.livroId)
      .pipe(finalize(() => this.finalizarLoading()))
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
      .subscribe({
        next: () => {
          const response = [...this._dataSource.getValue()].splice(idx + 1, 1);
          this._dataSource.next(response);
        },
        error: () => {},
      });
  }
}
