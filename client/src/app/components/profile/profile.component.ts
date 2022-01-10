import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = "";
  blogs: any [] = [];
  constructor(private _userService: UserService, private _blogService: BlogService, private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params=>{
      // const token:any = localStorage.getItem('token');
      // const logUserId = JSON.parse(atob(token.split('.')[1]))._id.toString();
      this._userService.get(`/${params.get('username')}`).subscribe((res: any)=>{
        this.user = res[0];
        console.log(this.user);
        this._blogService.getBlogsByUserId(`profileBlog/${this.user._id}`).subscribe((res: any)=>{
          this.blogs = res;
          console.log(this.blogs);
        })
      })
      
    });
    
  }

  getSortData() {
    return this.blogs.sort((a, b) => {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
  }

}
