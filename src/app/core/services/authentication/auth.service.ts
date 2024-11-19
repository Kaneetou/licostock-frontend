import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth/login'
  constructor(private http: HttpClient) { }

  login(emailUsuario: string, contraseñaUsuario: string): Observable<any>{
    return this.http.post(this.apiUrl, { emailUsuario, contraseñaUsuario })
  }

  saveToken(token: string, usario: { nombre : string, correo: string, rol : string }): void {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usario));
  }

  getUserData(): any {
    return JSON.parse(localStorage.getItem('usuario') || '{}');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

}
