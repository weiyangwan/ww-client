import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../../user/user'
import { AuthService }  from '../auth.service';

@Component({
  selector: 'ww-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authService: AuthService) {
    this.signupForm = new FormGroup({
      'username' : new FormControl('', Validators.required),
      'email' : new FormControl('', Validators.compose([ Validators.required, this.validEmail ])),
      'password' : new FormControl('', Validators.required),
      'passwordConfirmation' : new FormControl('', Validators.compose([ Validators.required, this.passwordsAreEqual.bind(this) ])),
    });
  }

  onSubmit()  {
    const user = new User(
      this.signupForm.value.username,
      this.signupForm.value.email,
      this.signupForm.value.password,
    );
    console.log(user);
    this.authService.signup(this.signupForm.value)
        .subscribe(
          data => console.log(data),
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
