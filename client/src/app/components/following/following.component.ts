import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
})
export class FollowingComponent implements OnInit {
  followArr: string[] = [];
  blogArr: Blog[] = [];
  constructor(
    private _userService: UserService,
    private _blogService: BlogService
  ) {}

  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    const userLogId = JSON.parse(atob(token.split('.')[1]))._id.toString();
    this._userService.getFollowing(userLogId).subscribe((res: any) => {
      // console.log(res);
      this.followArr = res.following; //append one user
      console.log(this.followArr);
      this.followArr.forEach((user) => {
        this._blogService.getBlogsByUserId(user).subscribe((res: any) => {
          this.blogArr.push(...res);  //Append mutli user blogs
        });
      });
    });
  }
  getSortData() {
    return this.blogArr.sort((a, b) => {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
  }
  getFullName(blog: Blog):string{
    return blog.author.firstname + ' ' + blog.author.lastname;
  }

  checkUser(){

    const  token = localStorage.getItem('token')
    return token;

  }

  hasBlog(blog:Blog){

    const token:any = localStorage.getItem('token') //user=> login , user=> author
    if(token){
   
      const currentUser = JSON.parse(atob(token.split('.')[1])).username //atob 
      const blogAuthor = blog.author.username;
      return blogAuthor == currentUser;
    }
    return false

  }
  followAuthor(_id: string){
    const token:any = localStorage.getItem('token');
    const logUserId = JSON.parse(atob(token.split('.')[1]))._id.toString();
    // console.log(username, logUserId);
    this._userService.follow(logUserId, _id).subscribe((res: any)=>{
      console.log(res);
      
    })


  }

  isFollow(blog:Blog):boolean{ 
    const blogAuthor = blog.author.username
    const check = this.followArr.some(user=> user == blogAuthor)
    return check;
  }
  deleteBlog(id: any){
    this._blogService.deleteBlog(id).subscribe((res:any)=>{
      const idx = this.blogArr.findIndex((blog)=>blog._id == id);
      this.blogArr.splice(idx, 1);
    })
  }

}
