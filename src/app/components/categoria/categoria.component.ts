import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  public categories:Array<Category>;
  public tempCategoria = new Category(null,null,null,null,null);
  public token;
  public status;
  constructor(
    private _categoryService:CategoryService,
    private _userService:UserService
  ) { 
    this.token=this._userService.getToken();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response=>{
        if(response.status=='success'){
          this.categories=response.data;
          console.log(this.categories);
        }
      },
      error=>{
        console.error(error);
      }
    );
  }  
  delete(){
    console.log(this.tempCategoria.id);
    this._categoryService.delete(this.token,this.tempCategoria.id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.ngOnInit();
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
  update(){
    this.tempCategoria.updated_at = "2020-06-17 08:41:32";
    console.log(this.tempCategoria);
    this._categoryService.update(this.tempCategoria, this.token).subscribe(
      response=>{
        console.log(response);
        if(response.status=="success"){
          console.log(response);
          this.status=response.status;
          this.ngOnInit();
        }else{
          this.status="error";
        }
      },
      error=>{
        this.status="error";
        console.log(error);
      }
    );
  }
  create(){
    console.log(this.tempCategoria);
    this._categoryService.create(this.tempCategoria,this.token).subscribe(
      response=>{
        if(response.status=="success"){
          this.status=response.status;
          this.ngOnInit();
        }else{
          this.status="error";
        }
      },
      error=>{
        this.status="error";
        console.log(error);
      }
    );
  }
  resetTempCategoria(){
    this.tempCategoria.id = null;
    this.tempCategoria.description = null;
    this.tempCategoria.created_at = null;
    this.tempCategoria.updated_at = null;

  }
  getCategory(id){
    this._categoryService.getCategory(id).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.tempCategoria = new Category(
            response.data.id,
            response.data.name,
            response.data.description,
            response.data.created_at,""
          );
          console.log(this.tempCategoria);
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
}
