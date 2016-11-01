import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { AuthComponent, AuthService } from './auth';
import { SignupComponent } from './auth/signup/signup.component';
import { UserComponent, UserService } from './user';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './auth/signin/signin.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PostsComponent, PostComponent, PostInputComponent, PostListComponent, PostService } from './post';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignupComponent,
    UserComponent,
    HomeComponent,
    SigninComponent,
    NavigationComponent,
    PostsComponent,
    PostInputComponent,
    PostListComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [AuthService, UserService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
