import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  cacheExpired(setup_time: number) {
    var now = new Date().getTime();
    var hours = 1 / 2;
    return now - setup_time > hours * 60 * 60 * 1000;
  }
}
