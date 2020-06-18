import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  public user:User;
  public status:string;
  public token;
  public identity;

  constructor(
    private _userService:UserService,
    private _router:Router,
    private _routes:ActivatedRoute
  ) {
    this.user=new User(1,"","","","","","","");
  }

  ngOnInit(): void {
    this.logout();
  }
  onSubmit(form){
    console.log(this.user);
    this._userService.signin(this.user).subscribe(
      response=>{
        if(response.status!="error"){
          this.status="success";
          this.token=response;
          localStorage.setItem("token",this.token);
          this._userService.getToken();
          this._userService.loadIdentity().subscribe(
            response=>{
              this.identity = JSON.stringify(response);
              localStorage.setItem("identity",this.identity);
            },
            error=>{
              this.identity=null;
              console.log(error);
            }

          );
          //console.log(this.token);
          form.reset();
          this._router.navigate(['inicio']);

        }
        else{
          this.status="error";
          console.log(response);
        }
      },
      error=>{
        this.status="error";
        console.log(error);
      }
    );
  }
  logout(){
    this._routes.params.subscribe(
      params=>{
        let logout= +params['sure'];
        if(logout==1){
          localStorage.removeItem('identity');
          localStorage.removeItem('token');
          this.identity=null;
          this.token=null;
          this._router.navigate(['inicio']);
        }
      }
    );
  }

}
