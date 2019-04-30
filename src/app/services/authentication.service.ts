import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  private authUrl: string;
  constructor(private httpClient: HttpClient) {
    //this.authUrl = 'http://localhost:3000/auth/v1/';
    this.authUrl = 'http://localhost:8089/api/v1/auth/login/'
  }

  registerUser(data) {
    this.authUrl = 'http://localhost:8089/api/v1/auth/register/'
    return this.httpClient.post(this.authUrl,data);
  }





  authenticateUser(data) {
    this.authUrl = 'http://localhost:8089/api/v1/auth/login/'    
    return this.httpClient.post(this.authUrl,data);
  }

  setBearerToken(token) {
    localStorage.setItem('Bearer Token',token);
  }

  getBearerToken() {
    return localStorage.getItem('Bearer Token');
  }

  setUser(userId) {
    localStorage.setItem('userId',userId);
  }

  getUser() {
    return localStorage.getItem('userId');
  }  

  isUserAuthenticated(token): Promise<boolean> {
   this.authUrl = 'http://localhost:3000/auth/v1/isAuthenticated';
    return this.httpClient.post(this.authUrl,{},{
      headers: new HttpHeaders().set('Authorization',`Bearer ${token}`)
    }).map(response => response['isAuthenticated']).toPromise();

  }
}
