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
    if (!this._storage) {
      await this.init();
    }
    await this._storage.set(key, value);
  }

  async get(key: string) {
    if (!this._storage) {
      await this.init();
    }
    return this._storage.get(key);
  }

  async remove(key: string) {
    if (!this._storage) {
      await this.init();
    }
    await this._storage.remove(key);
  }
}
