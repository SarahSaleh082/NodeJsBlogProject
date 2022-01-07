import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedUser: string = '';
  constructor() { }

  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    if(token){
      this.loggedUser = JSON.parse(atob(token.split('.')[1])).username

    }
  }
  checkUser(){

    const  token = localStorage.getItem('token')
    return token;

  }

  logout(){
    localStorage.removeItem('token');
  }

}
