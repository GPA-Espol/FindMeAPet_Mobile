import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async set(key: string, value: any) {
    await this._storage.set(key, value);
  }

  get(key: string) {
    return this._storage.get(key);
  }

  async remove(key: string) {
    await this._storage.remove(key);
  }
}
