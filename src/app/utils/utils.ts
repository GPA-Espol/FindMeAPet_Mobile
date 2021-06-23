import { Injectable } from '@angular/core';

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
   * @returns {bool} True if more than 30 minutes has passed from the setup_time.
   */
  cacheExpired(setup_time: number) {
    var now = new Date().getTime();
    var hours = 1 / 2;
    return now - setup_time > hours * 60 * 60 * 1000;
  }
}
