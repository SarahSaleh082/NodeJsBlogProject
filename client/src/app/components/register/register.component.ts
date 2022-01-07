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
  msgErr: string = "";
  constructor(private fb: FormBuilder, private _userService: UserService, private _router: Router) { }
  registerForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(10), Validators.pattern('^[A-Za-z]+$')]],
    lastname: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(10), Validators.pattern('^[A-Za-z]+$')]],
    username: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(10), Validators.pattern('^(?=[a-zA-Z0-9.]{5,}$)(?!.*[.]{2})[^.].*[^.]$')]],
    mail: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(20), Validators.pattern(/^\S+@\S+\.\S+$/)]],
    password: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(20), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/ )]],
    // repeatedPassword: ['', Validators.required],
    
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
      this._userService.register(this.registerForm.value).subscribe((res: any)=>{
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
  

  


}
