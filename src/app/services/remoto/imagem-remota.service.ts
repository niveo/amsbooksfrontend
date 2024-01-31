import { Injectable, inject } from '@angular/core';
import { getUrl } from 'aws-amplify/storage';
import { EMPTY, from, map, of, switchMap } from 'rxjs';
import { TOKEN_CARREGAR_IMAGEM_REMOTA } from 'src/app/common';

@Injectable({
  providedIn: 'root',
})
export class ImagemRemotaService {
  carregarImagemRemoto = inject(TOKEN_CARREGAR_IMAGEM_REMOTA);

  obterUrl(key: string, level: 'guest' | 'private' | 'protected' = 'guest') {
    return from(
      getUrl({
        key: key,
        options: {
          accessLevel: level,
        },
      })
    )
      .pipe(switchMap((c) => (!this.carregarImagemRemoto ? EMPTY : of(c))))
      .pipe(map((mp) => mp.url.toString()));
  }
}
