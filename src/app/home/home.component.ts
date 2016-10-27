import { Component, OnInit } from '@angular/core';

import { UserService }  from '../user';

@Component({
  selector: 'ww-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private isLoggedIn;
  private currentUser;

  constructor( private userService: UserService) { }

  ngOnInit() {
  
  }

}
