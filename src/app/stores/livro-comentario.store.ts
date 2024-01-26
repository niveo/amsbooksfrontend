import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { Observable, of } from 'rxjs';
import { LivroComentarioService } from '../services/livro-comentario.service';

export interface StoreStateModel {
  data: any[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LivroComentarioStore extends ObservableStore<StoreStateModel> {
  initialState = {
    loading: false,
    data: [],
  };
  livroId: number;

  constructor(public livroComentarioService: LivroComentarioService) {
    super({
      logStateChanges: true,
    });
    this.setState(this.initialState, 'INIT_STATE');
  }

  get(): Observable<StoreStateModel> {
    const state = this.getState();
    return of(state);
  }

  init(livroId: number) {
    this.livroId = livroId;
  }

  addComentario(rate: number, texto: string) {
    const state = this.getState();

    console.log('SO loading');

    this.setState(
      {
        loading: true,
      },
      'FETCHED_LOADING'
    );

    console.log('SO loading');

    this.livroComentarioService
      .create({
        livroId: this.livroId,
        rate: rate,
        texto: texto,
      })
      .subscribe({
        next: (response) => {
          const updatedState = {
            ...this.initialState,
            data: [...state.data, response],
            loading: false,
          };

          this.setState(updatedState, 'ADDED_COMENTARIO');
        },
        error: () => {},
      });
  }

  fetchData(): void {
    this.livroComentarioService.getAll(this.livroId).subscribe({
      next: (response) => {
        console.log(response);

        const updatedState = {
          ...this.initialState,
          data: response,
        };
        this.setState(updatedState, 'FETCHED_DATA');
      },
      error: () => {},
    });
  }
}
