import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {global} from './global';
@Injectable() export class CategoryService{
    public url:string;
    constructor(public _http:HttpClient){
        this.url=global.url;
    }
    create(category,token):Observable<any>{
        let json=JSON.stringify(category);
        let params='json='+json;
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('token',token);
        return this._http.post(this.url+'category',params,{headers:headers});
    }
    getCategories():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'category',{headers:headers});
    }
    getCategory(id):Observable<any>{
      return this._http.get(this.url+'category/'+id);
    }

}
