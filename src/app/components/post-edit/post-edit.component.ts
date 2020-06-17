import { Component, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import{PostService} from '../../services/post.service';
import { Router, ActivatedRoute} from '@angular/router';
import { global } from '../../services/global';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers:[UserService, CategoryService,PostService]
})
export class PostEditComponent implements OnInit {
  public identity;
  public token;
  public post:Post;
  public status:string;
  public categories;
  public resetVar=false;
  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };
  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    maxSize: "5",
    uploadAPI:  {
      url:global.url+'post/upload',
      headers: {
        "token" :localStorage.getItem('token')
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText:'Sube imagen',
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    private _userService:UserService,
    private _categoryService:CategoryService,
    private _postService:PostService
  ) {

      this.identity=this._userService.getIdentity();
      this.token=this._userService.getToken();
  }
  getPost():void{
    this._route.params.subscribe(params=>{
      let id=params['id'];
      this._postService.getPost(id).subscribe(
        response=>{
          if(response.status=='success'){
            let p=response.data;
            this.post=new Post(p.id,p.user_id,p.category_id,p.title,p.content,p.image,p.created_at);
            console.log(this.post);
          }else{
            this._router.navigate(['inicio']);
          }
        },
        error=>{
          this._router.navigate(['inicio']);
        }
      );
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.resetVar=false;
    this.getPost();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response=>{
        if(response.status=='success'){
          this.categories=response.data;
        }
      },
      error=>{
        console.error(error);
      }
    );
  }
  imageUpload(datos){
    let data = JSON.parse(datos.response);
    this.post.image=data.image;
  }
  onSubmit(form){
    console.log(this.post);
    this._postService.update(this.token,this.post).subscribe(
      response=>{
        if(response.status=="success"){
          this.status=response.status;
          form.reset();
          this.resetVar=true;
          this._router.navigate(['/post-detalle',this.post.id]);
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
}
