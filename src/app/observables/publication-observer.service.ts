import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Service in charge of the observable of the publications
 * @category Services
 */
@Injectable({
  providedIn: 'root',
})
export class PublicationObserverService {
  private publicationSubject = new Subject<any>();
  constructor() {}

  /**
   * Publish a new event that raises when the publications
   * have been changed
   */
  publish() {
    this.publicationSubject.next();
  }

  /**
   * Returns the Publication subject in order to observe the 
   * publications changes
   * @returns {Subject} The observable object
   */
  getObservable() {
    return this.publicationSubject;
  }
}
