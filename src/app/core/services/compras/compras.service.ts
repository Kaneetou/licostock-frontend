import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  crearCompra(detalleCompras: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/compras/crear`, { detalleCompras });
  }
  listarCompras(): Observable<any> {
    return this.http.get(`${this.apiUrl}/compras/listar`);
  }
  tomarDetalle(detalle: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/detallesc/crear`, detalle);
  }

  eliminarCompra(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/compras/eliminar/${id}`);
  }
}
