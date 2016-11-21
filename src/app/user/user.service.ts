import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { User } from '../user';

@Injectable()
export class UserService  {
  userId;
  user: User;

  private url = 'http://localhost:9000';

  constructor( private http: Http)  {}

  getCurrentUserDetails()  {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + '/users/' + this.userId, { headers: headers })
                    .map((response: Response) => {
                      this.user = response.json().user;
                      return this.user;
                    })
                    .catch((error: Response) => Observable.throw(error.json()));
  }

  getCurrentUserId()  {
    this.userId = localStorage.getItem('userId');
  }

  getCurrentUserName()  {
    return localStorage.getItem('username');
  }

  getUserNavigationLinks()  {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + '/users/navigationLinks/' + this.userId, { headers: headers })
                    .map((response: Response) => response.json().user)
                    .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteUser()  {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.delete( this.url + '/users/' + this.userId + token)
                    .map((response: Response) => response.json())
                    .catch((error: Response) => Observable.throw(error.json()));
  }
}
