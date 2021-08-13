import { Injectable } from '@angular/core';
import * as moment from 'moment';

/**
 * Service class in charge to provide some utilities functions to the system.
 * @category Services
 */
@Injectable({
  providedIn: 'root',
})
export class Utils {
  /**
   * Utility function that check if the time cache has expired (Every object cached
   * expires after 30 minutes).
   * @param {number} setup_time The date valued in miliseconds.
   * @returns {boolean} True if more than 30 minutes has passed from the setup_time.
   */
  static cacheExpired(setup_time: number): boolean {
    var now = new Date().getTime();
    var hours = 1 / 2;
    return now - setup_time > hours * 60 * 60 * 1000;
  }

  static capitalize(str: string) {
    if (str.length < 1) {
      return str;
    }
    const lower = str.toLowerCase();
    const firstUppercase = str.charAt(0).toUpperCase();
    return firstUppercase + lower.slice(1);
  }
  /**
   * Method that provides the days between to dates
   * @param date1 Date one
   * @param date2 Date two
   * @returns days difference of the two dates
   */

  static diffDays(date1, date2) {
    const day1 = date1.getDate();
    const day2 = date2.getDate();
    if (day1 >= day2) {
      return day1 - day2;
    }
    const prevMonth = moment(date1).subtract(1, 'month').toDate();
    const daysInPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate();
    return daysInPrevMonth - day2 + day1;
  }

  /**
   * Method the age in years, month and days units
   * @returns Object that contains age information in the attributes 'years', 'months', 'days'
   */
  static getInformationAge(fecha: Date) {
    const now = new Date();
    now.setUTCHours(0, 0, 0);
    const today = moment(now);
    const birthdate = moment(fecha);
    const days = Utils.diffDays(now, fecha);
    const years = today.diff(birthdate, 'years');
    today.add(-years, 'years');
    const months = today.diff(birthdate, 'months');
    today.add(-months, 'months');
    return { years: years, months: months, days: days };
  }

  static getObjectDifference(oldObject: any, newObject: any) {
    let resultObject: any = {};
    let keysObj1 = Object.keys(oldObject);
    keysObj1.forEach((key) => {
      if (oldObject[key] != newObject[key]) {
        resultObject[key] = newObject[key];
      }
    });
    return resultObject;
  }
}

export enum Mode {
  EDITAR = 'editar',
  ANADIR = 'anadir',
}

export enum NotificationType {
  ADD_PET_REQUEST = '1',
  EDIT_PET_REQUEST = '2',
  ADOPT_PET_REQUEST = '3',
  EXTERNAL_REQUEST = '4',
  ABSENT_NOTIF = '5',
}
