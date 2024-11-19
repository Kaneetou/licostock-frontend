import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../core/services/proveedores/proveedores.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit {

  proveedores: any[] = [];
  nuevoProveedor: any = {
    nombreProveedor: '',
    telefonoProveedor: '',
    emailProveedor: ''
  };
  proveedorEditado: any = {
    id: null,
    nombreProveedor: '',
    telefonoProveedor: '',
    emailProveedor: ''
  };
  isEditando: boolean = false;

  constructor(private proveedoresService: ProveedoresService) {}

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  obtenerProveedores() {
    this.proveedoresService.listarProveedores().subscribe(
      (response) => {
        this.proveedores = response.proveedoresListados;
      },
      (error) => {
        console.error('Error al obtener proveedores:', error);
      }
    );
  }

  agregarProveedor() {
    this.proveedoresService.crearProveedor(this.nuevoProveedor).subscribe(
      (response) => {
        this.obtenerProveedores(); // Actualiza la lista después de agregar
        this.nuevoProveedor = { nombreProveedor: '', telefonoProveedor: '', emailProveedor: '' }; // Reset
        console.log('Proveedor agregado exitosamente:', response);
      },
      (error) => {
        console.error('Error al agregar proveedor:', error);
      }
    );
  }

  eliminarProveedor(id: number) {
    this.proveedoresService.eliminarProveedor(id).subscribe(
      (response) => {
        this.obtenerProveedores(); // Actualiza la lista después de eliminar
        console.log('Proveedor eliminado');
      },
      (error) => {
        console.error('Error al eliminar proveedor:', error);
      }
    );
  }

  editarProveedor() {
    this.proveedoresService.editarProveedor(this.proveedorEditado.id, this.proveedorEditado).subscribe(
      (response) => {
        this.obtenerProveedores(); // Actualiza la lista después de editar
        this.isEditando = false; // Termina el modo de edición
        console.log('Proveedor actualizado:', response);
      },
      (error) => {
        console.error('Error al editar proveedor:', error);
      }
    );
  }

  iniciarEdicion(proveedor: any) {
    this.isEditando = true;
    this.proveedorEditado = { ...proveedor };
  }

  cancelarEdicion() {
    this.isEditando = false;
    this.proveedorEditado = { id: null, nombreProveedor: '', telefonoProveedor: '', emailProveedor: '' };
  }

}
