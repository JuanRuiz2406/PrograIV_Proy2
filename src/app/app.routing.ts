import{ModuleWithProviders} from '@angular/core';
import{Routes,RouterModule} from '@angular/router';

import{HomeComponent} from './components/home/home.component';
import{LoginComponent} from './components/login/login.component';
import{ErrorComponent} from './components/error/error.component';
import{RegisterComponent} from './components/register/register.component';
import{PostNewComponent} from './components/post-new/post-new.component';
import{UserEditComponent} from './components/user-edit/user-edit.component';
import {PostDetailComponent} from './components/post-detail/post-detail.component';
import{PostEditComponent} from './components/post-edit/post-edit.component';


const appRoutes: Routes=[
  {path:'',component:HomeComponent},
  {path:'inicio',component:HomeComponent},
  {path:'inicio/:id',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegisterComponent},
  {path:'crear-post',component:PostNewComponent},
  {path:'editar-usuario',component:UserEditComponent},
  {path:'post-detalle/:id',component:PostDetailComponent},
  {path:'editar-post/:id',component:PostEditComponent},
  {path:'logout/:sure',component:LoginComponent},


  {path:'**',component:ErrorComponent}
];

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);
