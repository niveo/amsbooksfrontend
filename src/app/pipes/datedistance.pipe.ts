import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance, parseISO } from 'date-fns';

@Pipe({
  name: 'datedistance',
  standalone: true,
})
export class DateDistancePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return formatDistance(parseISO(value), new Date());
  }
}
