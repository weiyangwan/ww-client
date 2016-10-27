import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth';
import { UserService } from '../user';

@Component({
  selector: 'ww-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  username;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.username = this.userService.getCurrentUserName();
  }

  logout()  {
    this.authService.logout();
    console.log("logout successful");
    this.router.navigateByUrl("/");
  }

}
