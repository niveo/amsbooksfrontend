import { Injectable, inject } from '@angular/core';
import { getUrl } from 'aws-amplify/storage';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { EMPTY, from, map, of, switchMap } from 'rxjs';
import { TOKEN_CARREGAR_IMAGEM_REMOTA } from 'src/app/common';
import { uploadData } from 'aws-amplify/storage';
import { Amplify } from 'aws-amplify';

type TYPE_ACESS_LEVEL_FILE = 'guest' | 'private' | 'protected';

@Injectable({
  providedIn: 'root',
})
export class ImagemRemotaService {
  private readonly carregarImagemRemoto = inject(TOKEN_CARREGAR_IMAGEM_REMOTA);

  getUrl(key: string, level: TYPE_ACESS_LEVEL_FILE = 'guest') {
    console.log(key);

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

  getUrlPublic(key: string) {
    if(!this.carregarImagemRemoto) return null;
    const s3 = Amplify.getConfig().Storage.S3;
    return `https://${s3.bucket}.s3.${s3.region}.amazonaws.com/public/${key}`;
  }

  upload(
    key: string,
    file: NzUploadFile,
    level: TYPE_ACESS_LEVEL_FILE = 'guest'
  ) {
    return from(
      uploadData({
        key: key,
        data: file as any,
        options: {
          accessLevel: level,
          contentType: file.type,
          metadata: {
            name: file.name,
            size: String(file.size),
            lastModified: String(file.lastModified),
          },
        },
      }).result
    ).pipe(map(() => true));
  }
}
