import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  crearVenta(detalleVentas: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/ventas/crear`, { detalleVentas });
  }
  listarVentas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ventas/listar`);
  }
  tomarDetalle(detalle: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/detallesv/crear`, detalle);
  }

  eliminarVenta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/ventas/eliminar/${id}`);
  }
}
