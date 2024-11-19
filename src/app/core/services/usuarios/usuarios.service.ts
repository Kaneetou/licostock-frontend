import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:3000/usuarios'; // URL de tu API de usuarios

  constructor(private http: HttpClient) {}

  // Método para listar los usuarios
  listarUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listar`);
  }

  // Método para crear un usuario
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear`, usuario);
  }

  // Método para eliminar un usuario
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${id}`);
  }
}
