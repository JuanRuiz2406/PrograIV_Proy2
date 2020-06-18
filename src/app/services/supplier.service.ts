import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {global} from './global';

@Injectable({
  providedIn: 'root'
})export class SupplierService {
  public url:string;
  constructor(public _http:HttpClient){
      this.url=global.url;
  }
  create(supplier,token):Observable<any>{
      let json=JSON.stringify(supplier);
      let params='json='+json;
      let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token',token);
      return this._http.post(this.url+'supplier',params,{headers:headers});
  }
  getSuppliers():Observable<any>{
      let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      return this._http.get(this.url+'supplier',{headers:headers});
  }
  getSupplier(id):Observable<any>{
    return this._http.get(this.url+'supplier/'+id);
  }
}
