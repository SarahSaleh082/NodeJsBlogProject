import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // validClass: boolean = true;
  success: boolean = false;
  imagePreview: string = '';
  msgErr: string = "";
  constructor(private fb: FormBuilder, private _userService: UserService, private _router: Router) { }
  registerForm: any = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(10), Validators.pattern('^[A-Za-z]+$')]],
    lastname: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(10), Validators.pattern('^[A-Za-z]+$')]],
    username: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(10), Validators.pattern('^(?=[a-zA-Z0-9.]{5,}$)(?!.*[.]{2})[^.].*[^.]$')]],
    image: ['', Validators.required],
    mail: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(20), Validators.pattern(/^\S+@\S+\.\S+$/)]],
    password: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(20), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/ )]],
    
    
  });
  ngOnInit(): void {
    // this.registerForm.valueChanges.subscribe(console.log)
  }
  // onSubmit(){
  //   if(this.registerForm.valid){
  //     this.valid = true;
  //     alert('req')
  //   } else {
  //     this.valid = false;
  //   }
  // }
  
  onSubmit(){
    if(this.registerForm.valid){
      // this.validClass = true;
      console.log(this.registerForm);
      const postData = new FormData();  //send large files

      postData.append('firstname', this.registerForm.value.firstname);
      postData.append('lastname', this.registerForm.value.lastname);
      postData.append('username', this.registerForm.value.username);
      postData.append('mail', this.registerForm.value.mail);
      postData.append('password', this.registerForm.value.password);
      postData.append(
        'image',
        this.registerForm.value.image,
        this.registerForm.value.username
      );
      this._userService.register(postData).subscribe((res: any)=>{
        // console.log(res);
        this.success= true;
        setTimeout(()=>{
          this._router.navigateByUrl('/login');
        }, 1000)
        
      }, (err)=>{
        this.msgErr = `@${err.error.keyValue.username}  already register`;
        console.log(err);
      })
    }
  }
  onImagePicked(event: any) {
    
    const file = event.target.files[0];
   
    this.registerForm.patchValue({ image: file }); //raw data buffer || base64
    this.registerForm.get('image').updateValueAndValidity();

    // to get row data buffer (file of image) and preview it in DOM
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      
    };
    reader.readAsDataURL(file); //callBack function
    
  }
  

  


}
