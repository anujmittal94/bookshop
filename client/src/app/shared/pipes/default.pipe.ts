import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default',
})
export class DefaultPipe implements PipeTransform {
  transform(ovalue: any, nvalue: any): any {
    if (!ovalue) {
      return nvalue;
    }
    return ovalue;
  }
}
