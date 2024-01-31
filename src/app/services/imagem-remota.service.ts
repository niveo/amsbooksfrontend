import { Injectable } from '@angular/core';
import { getUrl } from 'aws-amplify/storage';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagemRemotaService {
  obterUrl(key: string, level: 'guest' | 'private' | 'protected' = 'guest') {
    return from(
      getUrl({
        key: key,
        options: {
          accessLevel: level,
        },
      })
    ).pipe(map((mp) => mp.url.toString()));
  }
}
