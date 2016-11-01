import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Post } from './post';

@Injectable()
export class PostService  {
  private posts: Post[];
  private url = 'http://localhost:9000';

  constructor( private http: Http)  {}

  addPost(post: Post) {
    this.posts.push(post);
    const body = JSON.stringify(post);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

    return this.http.post( this.url + "/posts/new" + token, body, { headers: headers })
                    .map((response: Response) => response.json())
                    .catch((error: Response) => Observable.throw(error.json()));
  }

  editPost(post: Post, editedPost: string)  {
    post['content'] = editedPost;
    const body = JSON.stringify(post);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

    return this.http.patch( this.url + "/posts/" + post['_id']+ token, body, { headers: headers })
                    .map((response: Response) => response.json())
                    .catch((error: Response) => Observable.throw(error.json()));
  }

  deletePost(post: Post)  {
    this.posts.splice(this.posts.indexOf(post), 1);
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

    return this.http.delete( this.url + "/posts/" + post['_id'] + token)
                    .map((response: Response) => response.json())
                    .catch((error: Response) => Observable.throw(error.json()));
  }

  getPosts() {
    return this.http.get( this.url + "/posts")
                    .map((response: Response) => {
                      this.posts = response.json().posts;
                      return this.posts;
                    })
                    .catch((error: Response) => Observable.throw(error.json()));
  }
}
