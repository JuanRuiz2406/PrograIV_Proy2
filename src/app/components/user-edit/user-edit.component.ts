import { Component, OnInit, Renderer2} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers:[
    UserService
  ]
})
export class UserEditComponent implements OnInit {
  title='User-edit';
  public user:User;
  public identity;
  public token;
  public status;
  public resetVar=false;

  constructor(
    private _userService:UserService,
    private render:Renderer2,
    private _router:Router
    ) {
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.user=new User(
      this.identity.sub,
      this.identity.name,
      this.identity.last_name,
      this.identity.email,
      this.identity.username,"","",""
    );
    console.log(this.user);
  }

  ngOnInit(): void {
    this.resetVar=false;
  }
  avatarUpload(respuesta){
    let data=JSON.parse(respuesta.response);
  }
  onSubmit(form){
    console.log(this.user);
    this.user.updated_at = "2020-06-17 08:41:32";

    this._userService.update(this.user).subscribe(
      response=>{
        if(response.status=="success"){
          this.status="success";
          localStorage.setItem('identity',JSON.stringify(this.user));
          form.reset();
          this.resetVar=true;
          this.resetVar=false;
        }
        else{
          this.status="error";
        }
      },
      error=>{
        this.status="error";
        console.log(error);
      }
    );
  }
  delete(){
    console.log(this.identity.sub);
    this._userService.delete(this.token,this.identity.sub).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this._router.navigate(['logout/1']);
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
