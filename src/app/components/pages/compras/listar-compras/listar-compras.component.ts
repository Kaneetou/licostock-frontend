import { Component, Output, EventEmitter } from '@angular/core';
import { ComprasService } from '../../../../core/services/compras/compras.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-compras.component.html',
  styleUrl: './listar-compras.component.css'
})
export class ListarComprasComponent {
  compras: any[] = [];
  @Output() totalComprasEmitido = new EventEmitter<number>(); // Evento para emitir el total de compras

  constructor(private comprasService: ComprasService) {}

  ngOnInit(): void {
    this.cargarCompras();
  }

  cargarCompras() {
    this.comprasService.listarCompras().subscribe(
      response => {
        this.compras = response.comprasListadas;
        const total = this.compras.reduce((total, compra) => total + Number(compra.monto), 0); // Total de compras
        this.totalComprasEmitido.emit(total); // Emitir el total de compras
      },
      error => console.error('Error al cargar las compras:', error)
    );
  }

  eliminarCompra(id: number) {
    this.comprasService.eliminarCompra(id).subscribe(
      () => {
        this.compras = this.compras.filter(compra => compra.id !== id);
        console.log('Compra eliminada');
      },
      error => console.error('Error al eliminar compra:', error)
    );
  }
}
