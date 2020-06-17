import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {
  public user:User;
  public status:string;
  constructor(private _userService:UserService) {
    this.user= new User(1,"","","user_role","","","","");
  }

  ngOnInit(): void {
  }
  onSubmit(form){
    console.log(this.user);
    this._userService.register(this.user).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);
          this.status=response.status;
          form.reset();
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
