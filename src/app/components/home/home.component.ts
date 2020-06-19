import { Component, OnInit} from '@angular/core';
import {Post} from '../../models/post';
import{PostService} from '../../services/post.service';
import{UserService} from '../../services/user.service';
import{CategoryService} from '../../services/category.service';
import{global} from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[PostService, UserService,CategoryService]
})
export class HomeComponent implements OnInit {
  public posts:Array<Post>
  public url;
  public identity;
  public token;
  private checks;
  constructor(
    private _postService:PostService,
    private _userService:UserService,
    private _categoryService:CategoryService,
    private _route:ActivatedRoute,
    private _roter:Router
  ) {
    this.url=global.url;
    this.checks=0;
  }
  ngDoCheck(): void {
    this.checks++;
    if(this.checks>4){
      this.checks=0;
      this.loadComponents();
    }
  }
  ngOnInit(): void {
    this.checks=0;
    this.loadComponents();
    this.token=this._userService.getToken();
  }
  loadComponents(){
    let idCat;
    this.identity=this._userService.getIdentity();
    //this._route.params.subscribe(params=>{
    this._route.params.subscribe(params=>{idCat=params['id']});
    if(idCat){
      this.getPostsByCategories(idCat);
    }else{
      this.getPosts();
    }

  }
  getPostsByCategories(id){
    this._categoryService.getCategory(id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.posts=response.data.posts;
        }
        else{
          this._roter.navigate(['inicio']);
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
  getPosts(){
    this._postService.getPosts().subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.posts=response.data;
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
  delete(id){
    console.log(id);
    this._postService.delete(this.token,id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.getPosts();
        }
        else{
          console.log(response);
        }

      },
      error=>{
        console.log(error);
      }
    );
  }

}
