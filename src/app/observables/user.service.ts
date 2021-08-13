import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new Subject<any>();
  constructor() {}

  /**
   * Publish a new event that raises when the users
   * have been changed
   */
  publish() {
    this.userSubject.next();
  }

  /**
   * Returns the Publication subject in order to observe the
   * users changes
   * @returns {Subject} The observable object
   */
  getObservable() {
    return this.userSubject;
  }
}
