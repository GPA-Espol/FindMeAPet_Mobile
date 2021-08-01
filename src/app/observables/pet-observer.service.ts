import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Mascota } from '../model/mascota.model';

@Injectable({
  providedIn: 'root',
})
export class PetObserverService {
  private petSubject = new Subject<any>();
  publish(mascota: Mascota) {
    this.petSubject.next(mascota);
  }
  getObservable() {
    return this.petSubject;
  }
  constructor() {}
}
