import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  success: boolean = false;
  msgErr: string = "";
  constructor(private fb: FormBuilder, private _userService: UserService, private _router: Router) { }
  loginForm = this.fb.group({
    
    username: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(10), Validators.pattern('^(?=[a-zA-Z0-9.]{5,}$)(?!.*[.]{2})[^.].*[^.]$')]],
    password: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(20), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/ )]],
    
    
  });

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.loginForm.valid){
      // this.validClass = true;
      this._userService.login(this.loginForm.value).subscribe((res: any)=>{
        console.log(res);
        localStorage.setItem('token', res);
        this.success= true;
        setTimeout(()=>{
          this._router.navigate(['']);
        }, 1000)
        
      }, (err)=>{
        this.msgErr = err.error;
        
      })
    } else {
      alert('User form is not valid!!');
    }
  }

}
