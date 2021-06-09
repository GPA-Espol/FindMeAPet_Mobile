import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioGPA } from '../model/usuario_gpa.model';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root',
})
export class SistemaService {
  private _usuario: UsuarioGPA;

  constructor(private http: HttpClient, private store: StorageService) {
    console.log('creandose');
  }

  public async login(usuario: string, password: string) {
    let loginUrl = environment.api + 'auth';
    let { token, rol } = await this.http
      .post<any>(loginUrl, { usuario, password })
      .toPromise();
    await this.store.set('user', { token, rol });
  }
}
