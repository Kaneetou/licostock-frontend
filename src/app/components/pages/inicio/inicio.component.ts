import { Component } from '@angular/core';
import { ComprasService } from '../../../core/services/compras/compras.service';
import { VentasService } from '../../../core/services/ventas/ventas.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ListarComprasComponent } from '../compras/listar-compras/listar-compras.component';
import { ListarVentasComponent } from '../ventas/listar-ventas/listar-ventas.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, ListarComprasComponent, ListarVentasComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  totalCompras: number = 0;
  totalVentas: number = 0;

  constructor() {}

  ngOnInit(): void {
    // No es necesario hacer nada aquí, ya que los totales se manejan mediante los eventos
  }

  actualizarTotalCompras(total: number): void {
    this.totalCompras = total; // Asignar el total de compras
  }

  actualizarTotalVentas(total: number): void {
    this.totalVentas = total; // Asignar el total de ventas
  }
}
