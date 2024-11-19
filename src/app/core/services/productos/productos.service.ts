import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:3000/productos'; 
  constructor(private http: HttpClient) {}

  listarProductos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listar`);
  }

  crearProducto(producto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear`, producto);
  }
  editarProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editar/${id}`, producto);
  }
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${id}`);
  }
}

