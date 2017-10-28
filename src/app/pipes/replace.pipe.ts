import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {
  transform(value: string, toReplace: string, replacement: string): any {
    return value.replace(toReplace, replacement);
  }
}
