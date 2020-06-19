import { Sale } from 'src/app/models/sale';
import { SaleService } from '../../services/sale.service';
import { UserService } from '../../services/user.service';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Sale_Product } from '../../models/sale_product';
import { Sale_ProductService } from '../../services/sale_product.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { global } from '../../services/global';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  public sales:Array<Sale>;
  public customers:Array<Customer>;
  public sale_products:Array<Sale_Product>;
  public products:Array<Product>;
  public tempSale = new Sale(null,null,null,null,null,null,null);
  public tempSale_Product = new Sale_Product(null,null,null,null,null,null,null);
  public status:string;
  public token;
  public resetVar=false;
  public url;

  constructor(
    private _userService:UserService,
    private _saleService:SaleService,
    private _customerService:CustomerService,
    private _sale_productService:Sale_ProductService,
    private _productService:ProductService
  ) {
    this.token=this._userService.getToken();
    this.url=global.url;
  }

  ngOnInit(): void {
    this.getCustomers();
    this.getSale_Products();
    this.getSales();
    this.getProducts();
  }
  getSale(id){
    this._saleService.getSale(id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.tempSale = new Sale(
            response.data.id,
            response.data.iva,
            response.data.totalPrice,
            response.data.discount,
            response.data.created_at,
            response.data.updated_at,
            response.data.idCustomer
          );
          console.log(this.tempSale);
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
  getSales(){
    this._saleService.getSales().subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.sales=response.data;
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
  update(){
    this.tempSale.updated_at = "2020-06-17 08:41:32"
    console.log(this.tempSale);
    this._saleService.update(this.tempSale, this.token).subscribe(
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
  delete(){
    console.log(this.tempSale.id);
    this._saleService.delete(this.token,this.tempSale.id).subscribe(
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
  resettempSale(){
    this.tempSale.id = null;
    this.tempSale.iva = null;
    this.tempSale.totalPrice = null;
    this.tempSale.discount = null;
    this.tempSale.created_at = null;
    this.tempSale.updated_at = null;
    this.tempSale.idCustomer = null;
    console.log(this.tempSale);
  }
  resettempSale_Product(id){
    this.tempSale_Product.id = null;
    this.tempSale_Product.quantity = null;
    this.tempSale_Product.totalPrice = null;
    this.tempSale_Product.created_at = null;
    this.tempSale_Product.updated_at = null;
    this.tempSale_Product.idSale = id;
    this.tempSale_Product.idProduct = null;
    console.log(this.tempSale_Product);
  }
  create(){
    console.log(this.tempSale);
    this._saleService.create(this.tempSale,this.token).subscribe(
      response=>{
        if(response.status=="success"){
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
  createSaleProduct(){
    console.log(this.tempSale_Product);
    this._sale_productService.create(this.tempSale_Product,this.token).subscribe(
      response=>{
        if(response.status=="success"){
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
  getCustomers(){
    this._customerService.getCustomers().subscribe(
      response=>{
        if(response.status=='success'){
          this.customers=response.data;
          console.log(this.customers);
        }
      },
      error=>{
        console.error(error);
      }
    );
  }
  getSale_Products(){
    this._sale_productService.getSaleProducts().subscribe(
      response=>{
        if(response.status=='success'){
          this.sale_products=response.data;
          console.log(this.sale_products);
        }
      },
      error=>{
        console.error(error);
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
