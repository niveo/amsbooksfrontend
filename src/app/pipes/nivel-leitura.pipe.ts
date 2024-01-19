import { Pipe, PipeTransform } from '@angular/core';
import { NivelLeitura } from '../enuns';

@Pipe({
  name: 'nivelLeituraPipe',
  standalone: true,
})
export class NivelLeituraPipe implements PipeTransform {
  transform(value: number, ...args: any[]) {
    return NivelLeitura[value];
  }
}
