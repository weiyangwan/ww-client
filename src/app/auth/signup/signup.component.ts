import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User, UserService } from '../../user'
import { AuthService }  from '../auth.service';

@Component({
  selector: 'ww-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router) {
    this.signupForm = new FormGroup({
      'username' : new FormControl('', Validators.required),
      'email' : new FormControl('', Validators.compose([ Validators.required, this.validEmail ])),
      'password' : new FormControl('', Validators.required),
      'passwordConfirmation' : new FormControl('', Validators.compose([ Validators.required, this.passwordsAreEqual.bind(this) ])),
    });
  }

  onSubmit()  {
    this.authService.signup(this.signupForm.value)
        .subscribe(
          data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('username', data.username);
            this.authService.isLoggedIn();
            this.userService.getCurrentUserId();
            this.userService.getCurrentUserName();
            this.router.navigateByUrl('/home');
          },
          error => console.error(error)
        )
  }

  validEmail(control: FormControl): {[s: string]: boolean} {
      if (!control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
          return {invalidEmail: true};
      }
  }

  passwordsAreEqual(control: FormControl): {[s: string]: boolean} {
      if (!this.signupForm) {
          return {passwordsNotMatch: true};
      }
      if (control.value !== this.signupForm.controls['password'].value) {
          return {passwordsNotMatch: true};
      }
  }

  ngOnInit() {
  }

}
