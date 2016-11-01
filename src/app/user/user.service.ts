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
}
