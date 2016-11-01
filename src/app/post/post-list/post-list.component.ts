import { Component, OnInit } from '@angular/core';

import { Post } from '../post';
import { PostService } from '../post.service';
import { User, UserService } from '../../user';

@Component({
  selector: 'ww-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  currentUserPosts: User;

  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit() {
    // this.userService.getCurrentUserId();
    // this.userService.getCurrentUserDetails()
    //     .subscribe(
    //       data => {
    //         this.currentUserPosts = data.posts;
    //         console.log(this.currentUserPosts);
    //       }
    //     )
    this.postService.getPosts()
        .subscribe(
          data => {
            this.posts = data;
          }
        );
  }

}
