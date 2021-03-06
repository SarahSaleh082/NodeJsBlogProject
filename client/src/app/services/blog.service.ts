import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _apiService:ApiService) { }
  get(url: string){
    return this._apiService.get(url);
  }
  create(body: object){
    return this._apiService.post('/create', body);
  }
  getById(url: string){
    return this._apiService.get(url);
  }
  deleteBlog(id: any){
    return this._apiService.delete(`/${id}`);
  }
  getBlogsByUserId(id: any){
    return this._apiService.get(`/${id}`);
  }
  update(id: any,body: object){
    return this._apiService.patch(`/${id}`, body)
  }

  getByTitle(url: string){
    return this._apiService.get(url);
  }
  
}
