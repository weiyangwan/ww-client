import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../user/user'
import { AuthService } from '../auth.service';

@Component({
  selector: 'ww-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.signinForm = new FormGroup({
      'email' : new FormControl('', Validators.compose([ Validators.required, this.validEmail ])),
      'password' : new FormControl('', Validators.required),
    })
  }

  onSubmit()  {
    this.authService.signin(this.signinForm.value)
        .subscribe(
          data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            // this.router.navigateByUrl('/');
            console.log("signin successful")
          },
          error => console.error(error)
        )
  }

  validEmail(control: FormControl): {[s: string]: boolean} {
      if (!control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
          return {invalidEmail: true};
      }
  }

  ngOnInit() {
  }

}
