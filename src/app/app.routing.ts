import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {ErrorComponent} from './components/error/error.component';
import {RegisterComponent} from './components/register/register.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { VentaComponent } from './components/venta/venta.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},
  {path: 'inicio/:id', component: HomeComponent},
  {path: 'producto', component: ProductoComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path: 'proveedor', component: SupplierComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'editar-usuario', component: UserEditComponent},
  {path: 'logout/:sure', component: LoginComponent},
  {path: 'cliente', component: ClienteComponent},
  {path: 'venta', component: VentaComponent},


  {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
