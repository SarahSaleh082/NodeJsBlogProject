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
  imagePreview: string = " ";
  constructor(private fb: FormBuilder, private _blogService:BlogService, private _router:Router) { }
  createForm: any = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    tags: ['',[Validators.minLength(5), Validators.maxLength(20)]],
    body: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]],
    image: ['', Validators.required]
    
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
      // console.log(this.createForm.value);
      const postData = new FormData();  //send large files

      postData.append('title', this.createForm.value.title);
      postData.append('tags', this.createForm.value.tags);
      postData.append('body', this.createForm.value.body);
      postData.append(
        'image',
        this.createForm.value.image,
        this.createForm.value.title
      );
      this._blogService.create(postData).subscribe((res: any)=>{
        
        console.log(res);
        // this._router.navigate([`/blog/${res.id}`]);
        this._router.navigate(['']);



        
        
      }, ()=>{})
    } else {
      alert('User form is not valid!!');
    }
  }

  onImagePicked(event: any) {
    
    const file = event.target.files[0];
   
    this.createForm.patchValue({ image: file }); //raw data buffer || base64
    this.createForm.get('image').updateValueAndValidity();

    // to get row data buffer (file of image) and preview it in DOM
    const reader = new FileReader(); //read raw data and preview it as image
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      
    };
    reader.readAsDataURL(file); //callBack function  
    // console.log(reader);
  }
}
