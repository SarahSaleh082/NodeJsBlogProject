import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  blog : any;
  constructor(private _blogService:BlogService,private _ativatedRoute:ActivatedRoute, private _router: Router) { }
  
  ngOnInit(): void {
    this._ativatedRoute.paramMap.subscribe(params=>{

      
     this._blogService.getById(`/${params.get('id')}`).subscribe(
       (res:any)=>{
              // this.students.push(response.Data);   
              this.blog =res;
              console.log(res);
              // console.log(this.blog);
     });

    });
  }
  // checkUser(){

  //   const  token = localStorage.getItem('token');
  //   if(!token){
  //     this._router.navigate(['home']);
  //   }
  //   return token;

  // }

  hasBlog(blog:any){

    const token:any = localStorage.getItem('token') //user=> login , user=> author
    if(token){
   
      const currentUser = JSON.parse(atob(token.split('.')[1])).username //atob 
      const blogAuthor = blog?.author?.username;
      return blogAuthor == currentUser;
    }
    return false

  }


}
