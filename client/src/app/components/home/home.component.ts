import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogs: Blog [] = [];
  constructor(private _blogService: BlogService) { }

  ngOnInit(): void {
    this._blogService.get('/').subscribe((res: any)=>{
      this.blogs = res;
      console.log(this.blogs);
      console.log(res);
    }, (error)=>{})
  }
  getSortData() {
    return this.blogs.sort((a, b) => {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
  }
  getFullName(blog: Blog):string{
    return blog.author.firstname + ' ' + blog.author.lastname;
  }

}
