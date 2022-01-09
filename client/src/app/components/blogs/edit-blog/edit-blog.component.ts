import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  imagePreview: string = '';
  receviedImg: string = '';
  ID: string = '';
  blogId: number = 0;
  constructor(private fb: FormBuilder, private _blogService:BlogService, private _router:Router, private _activatedRoute:ActivatedRoute) { }
  editForm: any = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    image: ['', ]
    
  });
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params=>{

      
      this._blogService.getById(`/${params.get('id')}`).subscribe(
        (res:any)=>{
               // this.students.push(response.Data);   
              //  this.blog =res;
              this.editForm.patchValue({title: res.title, body: res.body});
              this.receviedImg = `http://localhost:3000/${res.image}`
              this.ID = res._id;
              this.blogId = res.id; //for navigate to specific blog from edit
               console.log(res);
               // console.log(this.blog);
      });
 
     });
  }
  checkUser(){

    const  token = localStorage.getItem('token');
    if(!token){
      this._router.navigate(['home']);
    }
    return token;

  }
  onCreate(){
    if(this.editForm.valid){
      // this.validClass = true;
      // console.log(editForm.value);
      const postData = new FormData();  //send large files

      postData.append('title', this.editForm.value.title);
      postData.append('body', this.editForm.value.body);
      if(this.imagePreview !== ''){
        postData.append(
          'image',
          this.editForm.value.image,
          this.editForm.value.title
        );
      }
      this._blogService.update(this.ID, postData).subscribe((res: any)=>{
        
        console.log(res);
        this._router.navigate([`/blog/${this.blogId}`]);


        
        
      }, ()=>{})
    } else {
      alert('User form is not valid!!');
    }
  }

  onImagePicked(event: any) {
    
    const file = event.target.files[0];
   
    this.editForm.patchValue({ image: file }); //raw data buffer || base64
    this.editForm.get('image').updateValueAndValidity();

    // to get row data buffer (file of image) and preview it in DOM
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      
    };
    reader.readAsDataURL(file); //callBack function
    
  }

}
