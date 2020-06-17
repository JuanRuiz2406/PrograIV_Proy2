import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  public products:Array<Product>;
  public tempProduct = new Product(null,null,null,null,null,null,null,null,null,null,null);;
  constructor(
    private _productService:ProductService
  ) {}

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
  
}
