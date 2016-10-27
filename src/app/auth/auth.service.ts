import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { User } from '../user/user';

@Injectable()
export class AuthService  {
  private url = 'http://localhost:9000';

  constructor( private http: Http)  {}

  signup(user: User)  {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/users/new', body, { headers: headers })
                    .map((response: Response) => response.json())
                    .catch((error: Response) => Observable.throw(error.json()));
  }

  signin(user: User)  {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/users/signin', body, { headers: headers })
                    .map((response: Response) => response.json())
                    .catch((error: Response) => Observable.throw(error.json()));
  }

  loginFacebook() {
    // const headers = new Headers({ 'Access-Control-Allow-Origin': '*'})
    return this.http.get(this.url + '/auth/login/facebook')
                    .map((response: Response) => console.log(response.json()));
  }

  loginGoogle() {

  }

  logout()  {
    localStorage.clear();
  }

  isLoggedIn()  {
    return localStorage.getItem('token') !== null;
  }

}
