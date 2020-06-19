import { Component,OnInit,DoCheck} from '@angular/core';
import {UserService} from './services/user.service';
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
    this.times=0;
  }
  ngOnInit(){
    this.times=0;
  }
  ngDoCheck(){
    this.times++;
    if(this.times>1){
      this.loadStorage();
      this.times=0;
    }
  }
  public loadStorage(){
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

}
