import { Injectable } from '@angular/core';
import {
  updateUserAttribute,
  type UpdateUserAttributeOutput,
} from 'aws-amplify/auth';
import { from, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioPerfilRemotoService {
  atualizarNome(name: string) {
    return from(
      updateUserAttribute({
        userAttribute: {
          attributeKey: 'name',
          value: name,
        },
      })
    )
      .pipe(catchError((error) => error))
      .pipe(map((mp: any) => (mp as UpdateUserAttributeOutput).isUpdated));
  }
}
