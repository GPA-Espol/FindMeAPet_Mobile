import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioGPA } from '../model/usuario_gpa.model';

@Injectable({
  providedIn: 'root',
})
export class SistemaService {
  private _usuario: UsuarioGPA;

  constructor(private http: HttpClient) {}

  public async login(usuario: String, contraseña: String) {}
}
