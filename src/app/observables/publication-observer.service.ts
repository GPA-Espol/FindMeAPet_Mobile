import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicationObserverService {
  private publicationSubject = new Subject<any>();
  constructor() {}

  publish() {
    this.publicationSubject.next();
  }

  getObservable() {
    return this.publicationSubject;
  }
}
