import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  public customers:Array<Customer>;
  public tempCustomer = new Customer(null,null,null,null,null,null,null,null);
  public status:string;
  public token;
  public resetVar=false;
  public url;

  constructor(
    private _customerService:CustomerService,
    private _userService:UserService,
  ) {
    this.token=this._userService.getToken();
    this.url=global.url;
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomer(id){
    this._customerService.getCustomer(id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.tempCustomer = new Customer(
            response.data.id,
            response.data.name,
            response.data.last_name,
            response.data.address,
            response.data.phone,
            response.data.email,
            "",""
          );
          console.log(this.tempCustomer);
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
  getCustomers(){
    this._customerService.getCustomers().subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.customers=response.data;
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
  update(){
    this.tempCustomer.updated_at = "2020-06-17 08:41:32"
    console.log(this.tempCustomer);
    this._customerService.update(this.tempCustomer, this.token).subscribe(
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
    console.log(this.tempCustomer.id);
    this._customerService.delete(this.token,this.tempCustomer.id).subscribe(
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
  resetTempCustomer(){
    this.tempCustomer.id = null;
    this.tempCustomer.name = null;
    this.tempCustomer.last_name = null;
    this.tempCustomer.address = null;
    this.tempCustomer.phone = null;
    this.tempCustomer.email = null;
    this.tempCustomer.created_at = null;
    this.tempCustomer.updated_at = null;
    console.log(this.tempCustomer);
  }
  create(){
    console.log(this.tempCustomer);
    this._customerService.create(this.tempCustomer,this.token).subscribe(
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
}
