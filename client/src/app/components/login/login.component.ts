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
  constructor(private fb: FormBuilder, private _userService: UserService, private _router: Router) { }
  loginForm = this.fb.group({
    
    username: ['', Validators.required],
    password: ['', Validators.required],
    // repeatedPassword: ['', Validators.required],
    
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
        
      }, ()=>{})
    } else {
      alert('User form is not valid!!');
    }
  }

}
