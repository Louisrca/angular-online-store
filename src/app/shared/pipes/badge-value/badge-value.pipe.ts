import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'badgeValue', standalone: true })
export class BadgeValuePipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '';
    return value > 9 ? '9+' : value.toString();
  }
}
