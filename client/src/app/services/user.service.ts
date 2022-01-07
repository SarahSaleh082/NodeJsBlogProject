import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
// import { time } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _apiService: ApiService) { }

  register(body: object){
    return this._apiService.post('/users/register', body);
  }

  login(body: object){
    return this._apiService.post('/users/login', body);
  }
  follow(id: string, username: string){
    return this._apiService.patch(`/users/follow/${id}`, {username});
  }

  getFollowing(id: string){
    return this._apiService.get(`/users/following/${id}`);
  }
}
