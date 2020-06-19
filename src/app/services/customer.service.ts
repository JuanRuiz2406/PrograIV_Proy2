import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {global} from './global';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public url:string;
  constructor(public _http:HttpClient) {
    this.url=global.url;
  }
  create(customer, token):Observable<any>{
    let json=JSON.stringify(customer);
    let params='json='+json;
    let encabezados=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token',token);
    return this._http.post(this.url+'customer',params,{headers:encabezados});
  }
  update(customer,token):Observable<any>{
    let json=JSON.stringify(customer);
    let params='json='+json;
    let cabeceras=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token',token);
    return this._http.put(this.url+'customer/'+customer.id,params,{headers:cabeceras});
  }
  getCustomer(id):Observable<any>{
    return this._http.get(this.url+'customer/'+id);
  }
  getCustomers():Observable<any>{
    let cabeceras=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'customer',{headers:cabeceras});
  }
  delete(token,id):Observable<any>{
    let cabeceras=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token',token);
    return this._http.delete(this.url+'customer/'+id,{headers:cabeceras});
  }
}
