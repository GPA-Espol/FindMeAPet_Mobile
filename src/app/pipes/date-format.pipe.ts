import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * Aux class to formate dates by a given input.
 * @category Pipes
 */
@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  /**Format a given date in a given format
   * @param {Date} date The date to format
   * @param {String} format (optional) the format in which you want to format the date. Default is DD/MM/YYYY 
   * @returns {String} Date string formatted.
   */
  transform(date: Date, format = 'DD/MM/YYYY'): string {
    return moment(date).format(format);
  }
}
