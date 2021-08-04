import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(date: Date, format = 'DD/MM/YYYY'): unknown {
    return moment(date).format(format);
  }
}
