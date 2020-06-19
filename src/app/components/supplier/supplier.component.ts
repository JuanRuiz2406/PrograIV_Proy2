import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../models/supplier';
import { SupplierService } from '../../services/supplier.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  public tempSupplier = new Supplier(null,null,null,null,null,null,null);
  public suppliers:Array<Supplier>;
  public token;
  public status;

  constructor(
    private _supplierService:SupplierService,
    private _userService:UserService
  ) {
    this.token=this._userService.getToken();
   }

  ngOnInit(): void {
    this.getSuppliers();
  }
  getSuppliers(){
    this._supplierService.getSuppliers().subscribe(
      response=>{
        if(response.status=='success'){
          this.suppliers=response.data;
          console.log(this.suppliers);
        }
      },
      error=>{
        console.error(error);
      }
    );
  }  
  delete(){
    console.log(this.tempSupplier.id);
    this._supplierService.delete(this.token,this.tempSupplier.id).subscribe(
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
  update(){
    this.tempSupplier.updated_at = "2020-06-17 08:41:32";
    console.log(this.tempSupplier);
    this._supplierService.update(this.tempSupplier, this.token).subscribe(
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
  create(){
    console.log(this.tempSupplier);
    this._supplierService.create(this.tempSupplier,this.token).subscribe(
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
  resetTempSupplier(){
    this.tempSupplier.id = null;
    this.tempSupplier.address = null;
    this.tempSupplier.name = null;
    this.tempSupplier.email = null;
    this.tempSupplier.phone = null;
    this.tempSupplier.created_at = null;
    this.tempSupplier.updated_at = null;
  }
  getSupplier(id){
    this._supplierService.getSupplier(id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.tempSupplier = new Supplier(
            response.data.id,
            response.data.address,
            response.data.name,
            response.data.email,
            response.data.phone,"",""
          );
          console.log(this.tempSupplier);
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
}
