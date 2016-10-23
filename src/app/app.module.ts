import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { AuthComponent, AuthService } from './auth';
import { SignupComponent } from './auth/signup/signup.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignupComponent,
    UserComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
