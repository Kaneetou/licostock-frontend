import { Component } from '@angular/core';
import { ComprasService } from '../../../../core/services/compras/compras.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-crear-compras',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CurrencyPipe, CommonModule],
  templateUrl: './crear-compras.component.html',
  styleUrl: './crear-compras.component.css'
})
export class CrearComprasComponent {
  detalles: any[] = [];
  totalCompra: number = 0;
  idProducto: number = 0;
  cantidadCompra: number = 0;

  constructor(private comprasService: ComprasService){}

  agregarDetalle() {
    if (this.idProducto && this.cantidadCompra > 0) {
      const detalle = { idProducto: this.idProducto, cantidadCompra: this.cantidadCompra };
      this.comprasService.tomarDetalle(detalle).subscribe(
        response => {
          const nuevoDetalle = response.nuevoDetalleCompra;
          this.detalles.push(nuevoDetalle);
          this.totalCompra += nuevoDetalle.cantidadCompra * nuevoDetalle.precioUnitario;
        },
        error => console.error('Error al añadir detalle:', error)
      );
    }
  }
  guardarCompra() {
    this.comprasService.crearCompra(this.detalles).subscribe(
      response => {
        console.log('Compra guardada exitosamente:', response);
        this.detalles = [];
        this.totalCompra = 0;
      },
      error => console.error('Error al guardar compra:', error)
    );
  }
}
