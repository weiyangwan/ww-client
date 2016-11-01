import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PostService } from '../post.service';
import { UserService } from '../../user';

@Component({
  selector: 'ww-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.scss']
})
export class PostInputComponent implements OnInit {
  postForm: FormGroup;
  userId;

  constructor(
    private postService: PostService,
    private userService: UserService) {
    this.postForm = new FormGroup({
      content: new FormControl('', Validators.required),
      user: new FormControl('dd', Validators.required)
    })
  }

  onSubmit()  {
    this.postService.addPost({
      content: this.postForm.value.content,
      user: this.userId,
      created_at: Date.now()
      })
     .subscribe(
       data => console.log(data),
       error => console.error(error)
     );
    //  postForm.resetForm();
  }

  ngOnInit() {
    this.userService.getCurrentUserId();
    this.userId = this.userService.userId;
  }

}
