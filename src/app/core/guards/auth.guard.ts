import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  const authService = inject(AuthService);
  const router = inject(Router); 

  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  
  const usuarioObtenido = authService.getUserData();

  const rolesPermitidos = route.data['roles'] as Array<string>;

  if(!usuarioObtenido) {
    router.navigate(['/login']);
    return false;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(usuarioObtenido.roleUsuario)) {
    router.navigate(['/home/denied']);
    return false;
  }
  
  return true;
};
