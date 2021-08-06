import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Mascota } from '../model/mascota.model';

/**
 * Service in charge of the observable of the pets
 * @category Services
 */
@Injectable({
  providedIn: 'root',
})
export class PetObserverService {
  private petSubject = new Subject<any>();
  constructor() {}

  /**
   * Publish a new event that raises when the a given pet
   * have been changed
   * @param mascota The instance of the pet that have been changed
   */
  publish(mascota: Mascota) {
    this.petSubject.next(mascota);
  }

  /**
   * Returns the Pet subject in order to observe the 
   * pets changes
   * @returns {Subject} The observable object
   */
  getObservable() {
    return this.petSubject;
  }
}
