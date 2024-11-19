import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VentasService } from '../../../../core/services/ventas/ventas.service';

@Component({
  selector: 'app-crear-ventas',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CurrencyPipe, CommonModule],
  templateUrl: './crear-ventas.component.html',
  styleUrl: './crear-ventas.component.css'
})
export class CrearVentasComponent {

  detalles: any[] = [];
  totalVenta: number = 0;
  idProducto: number = 0;
  cantidadVenta: number = 0;

  constructor (private ventasService: VentasService) {}
  
  agregarDetalle() {
    if (this.idProducto && this.cantidadVenta > 0) {
      const detalle = { idProducto: this.idProducto, cantidadVenta: this.cantidadVenta };
      this.ventasService.tomarDetalle(detalle).subscribe(
        response => {
          const nuevoDetalle = response.nuevoDetalleVenta;
          this.detalles.push(nuevoDetalle);
          this.totalVenta += nuevoDetalle.cantidadVenta * nuevoDetalle.precioUnitario;
        },
        error => console.error('Error al añadir detalle:', error)
      );
    }
  }
  guardarVenta() {
    this.ventasService.crearVenta(this.detalles).subscribe(
      response => {
        console.log('Venta guardada exitosamente:', response);
        this.detalles = [];
        this.totalVenta = 0;
      },
      error => console.error('Error al guardar venta:', error)
    );
  }
}
