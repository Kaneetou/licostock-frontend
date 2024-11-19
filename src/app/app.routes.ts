import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { TableComponent } from './components/table/table.component';
import { DeniedComponent } from './components/pages/denied/denied.component';
import { CrearComprasComponent } from './components/pages/compras/crear-compras/crear-compras.component';
import { ListarComprasComponent } from './components/pages/compras/listar-compras/listar-compras.component';
import { CrearVentasComponent } from './components/pages/ventas/crear-ventas/crear-ventas.component';
import { ListarVentasComponent } from './components/pages/ventas/listar-ventas/listar-ventas.component';
import { ProveedoresComponent } from './components/pages/proveedores/proveedores.component';
import { UsuarioComponent } from './components/pages/usuario/usuario.component';
import { InicioComponent } from './components/pages/inicio/inicio.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, 
        children: [
        {path: 'inicio', component: InicioComponent},
        {path: 'table', component: TableComponent, canActivate:[authGuard], data:{roles: [1]} },
        {path: 'ccompra', component: CrearComprasComponent, canActivate:[authGuard], data:{roles: [1]} },
        {path: 'lcompra', component: ListarComprasComponent, canActivate:[authGuard], data:{roles: [1]} },
        {path: 'cventa', component: CrearVentasComponent},
        {path: 'lventa', component: ListarVentasComponent},
        {path: 'proveedores', component: ProveedoresComponent, canActivate:[authGuard], data:{roles: [1]} },
        {path: 'usuarios', component: UsuarioComponent, canActivate:[authGuard], data:{roles: [1]} },
        { path: 'denied', component: DeniedComponent }
    ]},
];
