import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'ww-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  private signinForm = false;

  constructor( private authService: AuthService, private router: Router)  {}

  showSigninForm() {
    this.signinForm = true;
  }

  loginFacebook() {
    this.authService.loginFacebook()
        .subscribe(
          data => {
            console.log(data);
            console.log("login facebook success");
          },
          error => console.error(error)
        )
  }

  loginGoogle() {
    // this.authService.loginGoogle()

  }

  logout()  {
    this.authService.logout();
    // this.router.navigateByUrl
  }

}
