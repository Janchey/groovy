import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ComicsService {

  domain = this.authService.domain;
  options;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  createAuthHeader(){
   this.authService.getToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    });
  }

  newComic(comic){
    this.createAuthHeader();
    return this.http.post(this.domain + '/comics/newComic', comic, this.options).map(res => res.json());
  }

  getAllComics(){
    this.createAuthHeader();
    return this.http.get(this.domain + '/comics/allComics', this.options).map(res => res.json());
  }

  getSingleComic(id) {
    this.createAuthHeader(); 
    return this.http.get(this.domain + '/comics/singleComic/' + id, this.options).map(res => res.json());
  }

  editComic(comic){
    this.createAuthHeader(); 
    return this.http.put(this.domain + '/comics/updateComic', comic,  this.options).map(res => res.json());
  }

  deleteComic(id){
    this.createAuthHeader(); 
    return this.http.delete(this.domain + '/comics/deleteComic/' + id,  this.options).map(res => res.json());
  }

}
