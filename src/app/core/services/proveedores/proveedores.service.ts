import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

    private apiUrl = 'http://localhost:3000/proveedores'; // URL de tu API de proveedores
  
    constructor(private http: HttpClient) {}
  
    // Método para listar los proveedores
    listarProveedores(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/listar`);
    }
  
    // Método para crear un proveedor
    crearProveedor(proveedor: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/crear`, proveedor);
    }
  
    // Método para editar un proveedor
    editarProveedor(id: number, proveedor: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/editar/${id}`, proveedor);
    }
  
    // Método para eliminar un proveedor
    eliminarProveedor(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/eliminar/${id}`);
    }
  }
  
  
