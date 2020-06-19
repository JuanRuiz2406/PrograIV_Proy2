import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {global} from './global';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url:string;
  constructor(public _http:HttpClient) { 
    this.url=global.url;
  }
  create(product, token):Observable<any>{
    let json=JSON.stringify(product);
    let params='json='+json;
    let encabezados=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token',token);
    return this._http.post(this.url+'product',params,{headers:encabezados});
  }
  update(product,token):Observable<any>{
    let json=JSON.stringify(product);
    let params='json='+json;
    let cabeceras=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token',token);
    return this._http.put(this.url+'product/'+product.id,params,{headers:cabeceras});
  }
  getProduct(id):Observable<any>{
    return this._http.get(this.url+'product/'+id);
  }
  getProducts():Observable<any>{
    let cabeceras=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'product',{headers:cabeceras});
  }
  delete(token,id):Observable<any>{
    let cabeceras=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token',token);
    return this._http.delete(this.url+'product/'+id,{headers:cabeceras});
  }
}
