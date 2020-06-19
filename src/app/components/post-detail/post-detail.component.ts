import { Component, OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {PostService} from '../../services/post.service';
import {global} from '../../services/global';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers:[PostService]
})
export class PostDetailComponent implements OnInit {
  public post;
  public url;
  constructor(
    private _postService:PostService,
    private _route:ActivatedRoute,
    private _roter:Router
  ) {
    this.url=global.url+'post/image/';
    console.log(this.url);
  }

  ngOnInit(): void {
    this.getPost();
  }
  getPost():void{
    this._route.params.subscribe(params=>{
      let id=params['id'];
      this._postService.getPost(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.post=response.data;
            console.log(this.post);
          }else{
            this._roter.navigate(['inicio']);
          }
        },
        error=>{
          this._roter.navigate(['inicio']);
        }
      );
    });
  }

}
