import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { VentasService } from '../../../../core/services/ventas/ventas.service';

@Component({
  selector: 'app-listar-ventas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-ventas.component.html',
  styleUrl: './listar-ventas.component.css'
})
export class ListarVentasComponent {
  ventas: any[] = [];
  @Output() totalVentasEmitido = new EventEmitter<number>(); // Evento para emitir el total de ventas

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas() {
    this.ventasService.listarVentas().subscribe(
      (response) => {
        this.ventas = response.ventasListadas;
        const total = this.ventas.reduce((total, venta) => total + Number(venta.monto), 0); // Total de ventas
        this.totalVentasEmitido.emit(total); // Emitir el total de ventas
      },
      error => console.error('Error al cargar las compras:', error)
    );
  }

  eliminarVenta(id: number) {
    this.ventasService.eliminarVenta(id).subscribe(
      () => {
        this.ventas = this.ventas.filter(compra => compra.id !== id);
        console.log('Compra eliminada');
      },
      error => console.error('Error al eliminar compra:', error)
    );
  }
}
