import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'ww-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor( private authService: AuthService)  {}

  loginFacebook() {
    // this.authService.loginFacebook()
  }

  loginGoogle() {
    // this.authService.loginGoogle()

  }

  loginLocal()  {
    // this.authService.loginLocal()

  }

  signup()  {
    // this.authService.signup()
  }
}
