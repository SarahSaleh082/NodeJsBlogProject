import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // validClass: boolean = true;
  success: boolean = false;
  constructor(private fb: FormBuilder, private _userService: UserService, private _router: Router) { }
  registerForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    mail: ['', Validators.required],
    password: ['', Validators.required],
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
          this._router.navigate(['']);
        }, 1000)
        
      }, ()=>{})
    } else {
      alert('User form is not valid!!');
    }
  }
  

  


}
