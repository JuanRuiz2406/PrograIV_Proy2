import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import{global} from './global';


@ Injectable() export class UserService{
  public url:string;
  public token;
  public identity;
  constructor(public _http:HttpClient){
    this.url=global.url;
  }
  register(user):Observable<any>{
    let json=JSON.stringify(user);
    let params='json='+json;
    let encabezados=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.post(this.url+'user',params,{headers:encabezados});
  }
  signin(user):Observable<any>{
    let json=JSON.stringify(user);
    let params='json='+json;
    let encabezados=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.post(this.url+'user/login',params,{headers:encabezados});
  }
  update(user):Observable<any>{
    let json=JSON.stringify(user);
    let params='json='+json;
    let encabezados=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token',this.token);
    return this._http.put(this.url+'user/update',params,{headers:encabezados});
  }
  public getIdentity(){
    let ident=JSON.parse(localStorage.getItem('identity'));
    if(ident && ident!='undefined'){
      this.identity=ident;
    }
    else{
      this.identity=null;
    }
    return this.identity;
  }
  public getToken(){
    let tk=localStorage.getItem('token');
    if(tk && tk!='undefined'){
      this.token=tk;
    }
    else{
      this.token=null;
    }
    return this.token;
  }
  public loadIdentity(){
    let cabecera=new HttpHeaders().set('token',this.token);
    return this._http.get(this.url+'user/getidentity',{headers:cabecera});
  }
  delete(token,id):Observable<any>{
    let cabeceras=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token',token);
    return this._http.delete(this.url+'user/'+id,{headers:cabeceras});
  }
}
