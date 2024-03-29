import { Pipe, PipeTransform } from '@angular/core';
/**
 * Aux class to get the age of the pets
 * @category Pipes
 */
@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  /**Calculate the age of the pet from their date of birth
   * @param {Date} d Birthdate of the pet
   * @returns {String} with the age in years, or month if the pet is less than a year
   */
  transform(date: Date): string {
    let currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0);
    let year = currentDate.getFullYear() - date.getFullYear();
    let month = currentDate.getMonth() - date.getMonth();
    let day = currentDate.getDate() - date.getDate();
    let hour = currentDate.getHours() - date.getHours();
    let minute = currentDate.getMinutes() - date.getMinutes();
    let second = currentDate.getSeconds() - date.getSeconds();
    let createdSecond = year * 31556926 + month * 2629746 + day * 86400 + hour * 3600 + minute * 60 + second;
    if (createdSecond >= 31556926) {
      let yearAgo = Math.floor(createdSecond / 31556926);
      return yearAgo > 1 ? yearAgo + ' años' : yearAgo + ' año';
    } else if (createdSecond >= 2629746) {
      let monthAgo = Math.floor(createdSecond / 2629746);
      return monthAgo > 1 ? monthAgo + ' meses' : monthAgo + ' mes';
    } else if (createdSecond >= 86400) {
      let dayAgo = Math.floor(createdSecond / 86400);
      return dayAgo > 1 ? dayAgo + ' días' : dayAgo + ' día';
    }
    return '0 días';
  }
}
