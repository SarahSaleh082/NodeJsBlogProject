import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
// import { time } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _apiService: ApiService) { }

  get(username: string){
    return this._apiService.get(`/users/${username}`)
  }

  register(body: object){
    return this._apiService.post('/users/register', body);
  }

  login(body: object){
    return this._apiService.post('/users/login', body);
  }
  follow(id: string, ID: string){
    return this._apiService.patch(`/users/follow/${id}`, {ID});
  }

  getFollowing(id: string){
    return this._apiService.get(`/users/following/${id}`);
  }

  like(blogId: any, userId: any){
    return this._apiService.patch(`/users/like/${userId}`, {blogId});
  }

  getLikes(id: string){
    return this._apiService.get(`/users/likes/${id}`);
  }
}
