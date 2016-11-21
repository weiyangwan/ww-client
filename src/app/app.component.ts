import { Component, DoCheck, OnInit } from '@angular/core';

import { UserService } from './user';

@Component({
  selector: 'ww-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck, OnInit {
  userExist;

  constructor(private userService: UserService) {}

  //need to relook at this
  ngDoCheck()  {
    if(this.userService.getCurrentUserName()) {
      this.userExist = true;
    } else  {
      this.userExist = false;
    }
  }

  ngOnInit()  {
  }
}
