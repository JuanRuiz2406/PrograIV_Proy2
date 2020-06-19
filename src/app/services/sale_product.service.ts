import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {global} from './global';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Sale_ProductService {
  public url:string;
  constructor(public _http:HttpClient) {
    this.url=global.url;
  }
  create(sale_product, token):Observable<any>{
    let json=JSON.stringify(sale_product);
    let params='json='+json;
    let encabezados=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token',token);
    return this._http.post(this.url+'sale_product',params,{headers:encabezados});
  }
  update(sale_product,token):Observable<any>{
    let json=JSON.stringify(sale_product);
    let params='json='+json;
    let cabeceras=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token',token);
    return this._http.put(this.url+'sale_product/'+sale_product.id,params,{headers:cabeceras});
  }
  getSaleProduct(id):Observable<any>{
    return this._http.get(this.url+'sale_product/'+id);
  }
  getSaleProducts():Observable<any>{
    let cabeceras=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'sale_product',{headers:cabeceras});
  }
  delete(token,id):Observable<any>{
    let cabeceras=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token',token);
    return this._http.delete(this.url+'sale_product/'+id,{headers:cabeceras});
  }
}
