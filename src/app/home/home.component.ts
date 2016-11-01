import { Component, OnInit } from '@angular/core';

import { User, UserService }  from '../user';

@Component({
  selector: 'ww-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private isLoggedIn;
  currentUser: User;

  constructor( private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUserId();
    this.userService.getCurrentUserDetails()
        .subscribe(
          data => {
            this.currentUser = data;
            console.log(this.currentUser);
          },
          error => console.error(error)
        )
  }
}
