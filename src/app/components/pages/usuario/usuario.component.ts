import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../core/services/usuarios/usuarios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {
  usuarios: any[] = [];
  nuevoUsuario: any = {
    nombreUsuario: '',
    emailUsuario: '',
    contraseñaUsuario: '',
    telefonoUsuario: '',
    estadoUsuario: 'activo',
    idRol: 1
  };

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuariosService.listarUsuarios().subscribe(
      (response) => {
        this.usuarios = response.usuario.map((usuario: any) => ({
          ...usuario,
          estadoUsuario: usuario.estadoUsuario ? 'Activo' : 'Inactivo', // Convierte el valor
          idRol: usuario.idRol === 1 ? 'Administrador' : usuario.idRol === 2 ? 'Vendedor' : 'Desconocido'
        }));      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  agregarUsuario() {
    const estadoBooleano = this.nuevoUsuario.estadoUsuario === 'activo' ? true : false;
    this.nuevoUsuario.idRol = Number(this.nuevoUsuario.idRol);

    this.nuevoUsuario.estadoUsuario = estadoBooleano;
    this.usuariosService.crearUsuario(this.nuevoUsuario).subscribe(
      (response) => {
        this.obtenerUsuarios(); // Actualiza la lista después de agregar
        this.nuevoUsuario = { nombreUsuario: '', emailUsuario: '', contraseñaUsuario: '', telefonoUsuario: '', estadoUsuario: 'activo', idRol: 1 }; // Reset
        console.log('Usuario agregado exitosamente:', response);
      },
      (error) => {
        console.error('Error al agregar usuario:', error);
      }
    );
  }

  eliminarUsuario(id: number) {
    this.usuariosService.eliminarUsuario(id).subscribe(
      (response) => {
        this.obtenerUsuarios(); // Actualiza la lista después de eliminar
        console.log('Usuario eliminado');
      },
      (error) => {
        console.error('Error al eliminar usuario:', error);
      }
    );
  }
}
