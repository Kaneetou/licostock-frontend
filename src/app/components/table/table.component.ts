import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductosService } from '../../core/services/productos/productos.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{

    productos: any[] = [];
    productoForm: FormGroup;
    productoSeleccionado: any = null;
    
    loading: boolean = true;

    constructor(private productoService: ProductosService, private fb: FormBuilder) { 
      this.productoForm = this.fb.group({
        nombreProducto: '',
        precioCompra: 0,
        precioVenta: 0,
        stockActual: 0,
        idProveedor: null
      })
    }

    ngOnInit(): void {
        this.obtenerProductos();
    }

    obtenerProductos(): void {
      this.productoService.listarProductos().subscribe(
        (response) => {
          this.productos = response.productosListados;
        },
        (error) => {
          console.error('Error al obtener productos:', error);
        }
      );
    }

    editarProducto(producto: any): void {
      this.productoSeleccionado = producto;
      this.productoForm.patchValue(producto); // Cargar los valores en el formulario
    }
  
    eliminarProducto(id: number): void {
      this.productoService.eliminarProducto(id).subscribe(
        () => {
          this.productos = this.productos.filter(p => p.id !== id);
        },
        (error) => {
          console.error('Error al eliminar producto:', error);
        }
      );
    }

    guardarEdicion(): void {
      if (this.productoSeleccionado && this.productoForm.valid) {
        this.productoService.editarProducto(this.productoSeleccionado.id, this.productoForm.value).subscribe(
          (response) => {
            const index = this.productos.findIndex(p => p.id === this.productoSeleccionado.id);
            if (index !== -1) {
              this.productos[index] = response.producto;
            }
            this.cancelarEdicion(); // Limpiar el formulario y el producto seleccionado
          },
          (error) => {
            console.error('Error al guardar los cambios del producto:', error);
          }
        );
      }
    }

    cancelarEdicion(): void {
      this.productoSeleccionado = null;
      this.productoForm.reset();
    }
    
    agregarProducto(): void {
      if (this.productoForm.valid) {
        this.productoService.crearProducto(this.productoForm.value).subscribe(
          (response) => {
            this.productos.push(response.productos);
            this.productoForm.reset(); // Limpiar el formulario después de agregar
          },
          (error) => {
            console.error('Error al agregar producto:', error);
          }
        );
      }
    }
}
