import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogs: Blog [] = [];
  followArr: string [] = [];
  likeArr: string [] = [];
  tags: any [] = [];
  constructor(private _blogService: BlogService, private _userService: UserService) { }

  ngOnInit(): void {
    //Get Blogs
    this._blogService.get('/').subscribe((res: any)=>{
      this.blogs = res;

      console.log(this.blogs);
      console.log(res);
    }, (error)=>{});

    const token:any = localStorage.getItem('token');
    const logUserId = JSON.parse(atob(token.split('.')[1]))._id.toString();
    this._userService.getLikes(logUserId).subscribe((res: any)=>{
      this.likeArr = res.likes;
    }, (error)=>{});

    //Get Following

    this._userService.getFollowing(logUserId).subscribe((res: any) => {
      // console.log(res);
      this.followArr = res.following; //append one user
      console.log(this.followArr);
      
      });

    //Get Tags

    this._blogService.get('/get/tags').subscribe((res: any)=>{
      res.forEach((item: any)=> this.tags.push(item.tags)); //[{[]}]=>[[]]
      // console.log(this.tags);
      let newArr = this.tags.reduce((a, b) => [...a, ...b], []);
      this.tags = [...new Set(newArr)];
      console.log(this.tags);
    });
    
    
  }

  

  // displayStyle = "none";
  
  // openPopup() {
  //   this.displayStyle = "block";
  // }
  // closePopup() {
  //   this.displayStyle = "none";
  // }
  getSortData() {
    return this.blogs.sort((a, b) => {
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

  //Give action of Following

  followAuthor(_id: string){
    const token:any = localStorage.getItem('token');
    const logUserId = JSON.parse(atob(token.split('.')[1]))._id.toString();
    // console.log(username, logUserId);
    this._userService.follow(logUserId, _id).subscribe((res: any)=>{
      console.log(res);
      
    })


  }
  //make follow before or not
  isFollow(blog:Blog):boolean{ 
    const blogAuthor = blog.author._id.toString();
    const check = this.followArr.some(user=> user == blogAuthor)
    return check;
  }
  giveLike(blogId: any){
    const token:any = localStorage.getItem('token');
    const logUserId = JSON.parse(atob(token.split('.')[1]))._id.toString();
    this._userService.like(blogId, logUserId).subscribe((res:any)=>{
      console.log(res);  //res of patch said modified
    })
  }

  isLike(Id: any){
    return this.likeArr.some(like=> like == Id);
  }
  deleteBlog(id: any){
    this._blogService.deleteBlog(id).subscribe((res:any)=>{
      const idx = this.blogs.findIndex((item)=>item._id == id);
      this.blogs.splice(idx, 1);
    })
  }

  search(title: any){
    // console.log(title);
    this._blogService.getByTitle(`/search/title?title=${title}`).subscribe((res: any)=>{
      // console.log(res);
      this.blogs = res;
      return this.blogs.filter(item=> item.title== title)
    });
  }

  getPagination(limit: any, skip: any){
    this._blogService.get(`/?limit=${limit}&skip=${skip}`).subscribe((res: any)=>{
      this.blogs = res;
    })
  }

  getByTag(tag: any){
    this._blogService.get(`/getTags/${tag}`).subscribe((res: any)=>{
      this.blogs = res;
    })
  }

}
