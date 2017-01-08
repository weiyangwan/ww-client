import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { AuthService } from '../auth';
import { User, UserService } from '../user';

@Component({
  selector: 'ww-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  user: User;

  currentUserSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUserSubscription = this.userService.updateCurrentUser
                                       .subscribe(
                                         data =>  {
                                           this.user = data;
                                         }
                                       )
  }

  logout()  {
    this.authService.logout();
    console.log("logout successful");
    // this.router.navigateByUrl("/");
  }

}
