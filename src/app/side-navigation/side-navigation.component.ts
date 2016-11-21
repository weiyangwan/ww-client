import { Component, OnInit } from '@angular/core';

import { User, UserService } from '../user';

@Component({
  selector: 'ww-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUserId();
    this.userService.getUserNavigationLinks()
        .subscribe(data => {
          this.user = data;
        });
  }

}
