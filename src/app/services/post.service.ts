import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {global} from './global';
import { ThrowStmt } from '@angular/compiler';
@Injectable() export class PostService{
    public url:string;
    constructor(public _http:HttpClient){
        this.url=global.url;
    }
    create(post,token):Observable<any>{
        let json=JSON.stringify(post);
        let params='json='+json;
        console.log(params);
        console.log(this.url);
        let cabeceras=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token',token);
        return this._http.post(this.url+'post',params,{headers:cabeceras});
    }
    getPosts():Observable<any>{
      let cabeceras=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      return this._http.get(this.url+'post',{headers:cabeceras});
    }
    getPost(id):Observable<any>{
      return this._http.get(this.url+'post/'+id);
    }
    update(token,post):Observable<any>{
      let json=JSON.stringify(post);
      let params='json='+json;
      let cabeceras=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token',token);
      return this._http.put(this.url+'post/1',params,{headers:cabeceras});
    }
    delete(token,id):Observable<any>{
      let cabeceras=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token',token);
      return this._http.get(this.url+'post/'+id,{headers:cabeceras});
    }

}
