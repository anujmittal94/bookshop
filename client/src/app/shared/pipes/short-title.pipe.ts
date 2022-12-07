import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTitle',
})
export class ShortTitlePipe implements PipeTransform {
  transform(value: string | undefined): string | undefined {
    if (value && value.length > 40) {
      return value.slice(0, 38) + '...';
    }
    return value;
  }
}
