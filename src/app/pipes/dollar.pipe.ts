import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dollar',
  standalone: true
})
export class DollarPipe implements PipeTransform {

  transform(value:string): string {
    return `$${value} million`;
  }

}
