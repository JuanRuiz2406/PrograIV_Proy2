import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService,CategoryService]
})
export class CategoryNewComponent implements OnInit {

  public identity;
  public token;
  public category:Category;
  public status:string;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _categoryService:CategoryService
  ) {
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    //this.category=new Category(1,'');
  }

  ngOnInit(): void {
  }
  onSubmit(form){
    console.log(this.token);
    this._categoryService.create(this.category,this.token).subscribe(
      response=>{
        this.status='success';
        this._router.navigate(['/inicio']);
      },
      error=>{
        this.status='error';
      }
    );
  }

}
