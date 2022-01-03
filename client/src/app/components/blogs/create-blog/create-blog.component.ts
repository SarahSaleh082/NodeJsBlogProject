import { BlogService } from './../../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  constructor(private fb: FormBuilder, private _blogService:BlogService, private _router:Router) { }
  createForm = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required]
    
  });
  ngOnInit(): void {
  }
  checkUser(){

    const  token = localStorage.getItem('token');
    if(!token){
      this._router.navigate(['home']);
    }
    return token;

  }
  onCreate(){
    if(this.createForm.valid){
      // this.validClass = true;
      console.log(this.createForm.value);
      this._blogService.create(this.createForm.value).subscribe((res: any)=>{
        
        console.log(res);

        
        
      }, ()=>{})
    } else {
      alert('User form is not valid!!');
    }
  }


}
