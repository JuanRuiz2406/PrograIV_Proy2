import { Component,OnInit,DoCheck} from '@angular/core';
import {UserService} from './services/user.service';
import {global} from './services/global';
import {CategoryService} from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[
    UserService,
    CategoryService
  ]
})
export class AppComponent {
  public identity;
  public urlImg;
  public token;
  public categories;
  public times;

  constructor(
    public _userService:UserService,
    public _categoryService:CategoryService
    ){
    this.loadStorage();
    this.urlImg=global.url+'user/avatar/';
    this.times=0;
  }
  ngOnInit(){
    this.times=0;
  }
  ngDoCheck(){
    this.times++;
    console.log(this.times);
    if(this.times>1){
      this.loadStorage();
      this.loadCategories();
      this.times=0;
    }
  }
  public loadCategories(){
    this._categoryService.getCategories().subscribe(
      response=>{
        console.log(response);
        if(response.status=="success"){
          this.categories=response.data;
          console.log(this.categories);
        }else{
          this.categories=null;
        console.log(response);
        }
      },
      error=>{
        this.categories=null;
        console.log(error);
      }
    );
  }
  public loadStorage(){
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

}
