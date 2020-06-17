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
  getProduct(id):Observable<any>{
    return this._http.get(this.url+'product/'+id);
  }
  getProducts():Observable<any>{
    let cabeceras=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'product',{headers:cabeceras});
  }
}
