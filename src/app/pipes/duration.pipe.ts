import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(value: string): string {
    const minutes = parseInt(value);
    return `${Math.floor(minutes / 60)}h ${minutes % 60}min`;
  }

}
