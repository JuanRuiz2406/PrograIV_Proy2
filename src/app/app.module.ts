import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {FroalaEditorModule,FroalaViewModule} from 'angular-froala-wysiwyg';


import{routing,appRoutingProviders} from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { RegisterComponent } from './components/register/register.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { VentaComponent } from './components/venta/venta.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    UserEditComponent,
    RegisterComponent,
    PostNewComponent,
    CategoryNewComponent,
    PostDetailComponent,
    PostEditComponent,
    ProductoComponent,
    ClienteComponent,
    VentaComponent,
    CategoriaComponent,
    SupplierComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    AngularFileUploaderModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
