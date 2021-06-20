import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * Service class in charge of manage the access to local storage of the
 * user's device.
 * @category Services
 */
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

  /**
   * Set the pair key:value in the local storage.
   * @param {string} key key to identify the value saved in localStorage
   * @param {any} value the value to save in localStorage
   */
  async set(key: string, value: any) {
    if (!this._storage) {
      await this.init();
    }
    await this._storage.set(key, value);
  }

  /**
   * Get the object saved by the key in the localStorage
   * @param {string} key the key identifying the object
   * @returns The value of the object identified by the key, if the key is
   * invalid, it returns undefined
   */
  async get(key: string) {
    if (!this._storage) {
      await this.init();
    }
    return this._storage.get(key);
  }

  /**
   * Remove the pair key:value from the localStorage
   * @param key The key identifying the value to remove
   */
  async remove(key: string) {
    if (!this._storage) {
      await this.init();
    }
    await this._storage.remove(key);
  }
}
