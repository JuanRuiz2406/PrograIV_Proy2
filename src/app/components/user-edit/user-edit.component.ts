import { Component, OnInit, Renderer2} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {global} from '../../services/global';

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
  public urlImg;
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
      url:global.url+'user/upload',
      method:"POST",
      headers: {
        "token" : localStorage.getItem('token')
      }
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
};
  constructor(private _userService:UserService,private render:Renderer2) {
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.user=new User(
      this.identity.sub,
      this.identity.name,
      this.identity.last_name,
      this.identity.role,
      this.identity.email,"",this.identity.description,
      this.identity.image
    );
    this.urlImg=global.url+'user/avatar/'
  }

  ngOnInit(): void {
    this.resetVar=false;
  }
  avatarUpload(respuesta){
    let data=JSON.parse(respuesta.response);
    //this.user.image=data.image;
  }
  onSubmit(form){
    console.log(this.user);
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

}
