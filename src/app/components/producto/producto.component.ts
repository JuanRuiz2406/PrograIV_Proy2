import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { global } from '../../services/global';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  public products:Array<Product>;
  public tempProduct = new Product(null,null,null,null,null,null,null,null,null,null,null);
  public status:string;
  public token;
  public resetVar=false;
  public url;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    maxSize: "5",
    uploadAPI:  {
      url:global.url+'product/upload',
      headers: {
        "token" :localStorage.getItem('token')
      }
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText:'Sube imagen',
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(
    private _productService:ProductService,
    private _userService:UserService,
    private _router:Router
  ) {
    this.token=this._userService.getToken();
    this.url=global.url;
  }

  ngOnInit(): void {
    this.getProducts();
  }
  getProduct(id){
    this._productService.getProduct(id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.tempProduct = new Product(
            response.data.id,
            response.data.name,
            response.data.description,
            response.data.currentExist,
            response.data.minExist,
            response.data.price,
            response.data.image,
            "","",
            response.data.supplier.id,
            response.data.category.id
          );
          console.log(this.tempProduct);
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
  getProducts(){
    this._productService.getProducts().subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.products=response.data;
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
  update(){
    this.tempProduct.updated_at = "2020-06-17 08:41:32"
    this._productService.create(this.tempProduct, this.token).subscribe(
      response=>{
        console.log(response);
        if(response.status=="success"){
          console.log(response);
          this.status=response.status;
          this.ngOnInit();
        }else{
          this.status="error";
        }
      },
      error=>{
        this.status="error";
        console.log(error);
      }
    );
  }
  imageUpload(datos){
    console.log(datos);
    let data = JSON.parse(datos.response);
    this.tempProduct.image=data.image;
  }
  delete(){
    console.log(this.tempProduct.id);
    this._productService.delete(this.token,this.tempProduct.id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.ngOnInit();
        }
        else{
          console.log(response);
        }

      },
      error=>{
        console.log(error);
      }
    );
  }
  resetTempProduct(){
    this.tempProduct.id = 99;
    this.tempProduct.name = null;
    this.tempProduct.description = null;
    this.tempProduct.currentExist = null;
    this.tempProduct.minExist = null;
    this.tempProduct.price = null;
    this.tempProduct.image = null;
    this.tempProduct.idCategory = null;
    this.tempProduct.idSupplier = null;
    this.tempProduct.created_at = null;
    this.tempProduct.updated_at = null;
    console.log(this.tempProduct); 
  }
  create(){
    this._productService.create(this.tempProduct,this.token).subscribe(
      response=>{
        if(response.status=="success"){
          this.status=response.status;
        }else{
          this.status="error";
        }
      },
      error=>{
        this.status="error";
        console.log(error);
      }
    );
  }
}
