import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/authentication/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  usuarioNombre: String = "";
  usuarioRol: String = "";
  usuarioEmail: String = "";
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    const usuario = this.authService.getUserData();
    this.usuarioNombre = usuario.nombreUsuario;
    this.usuarioEmail = usuario.emailUsuario;
    if(usuario.roleUsuario == 1) {
      this.usuarioRol = 'Administrador'
    } else if (usuario.roleUsuario == 2) {
      this.usuarioRol = 'Vendedor'
    }
  }
  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
