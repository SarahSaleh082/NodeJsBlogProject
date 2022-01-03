import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

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
}
