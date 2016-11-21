import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthComponent, AuthService, SignupComponent, SigninComponent } from './auth';
import { UserComponent, UserService, ProfileComponent, ProfileDetailsComponent } from './user';
import { PostsComponent, PostComponent, PostInputComponent, PostListComponent, PostService } from './post';
import { ItineraryComponent, ItinerarySummaryComponent, ItineraryDetailsComponent, ItineraryService, ItineraryActivityComponent, ItineraryResourcesComponent, ItineraryNewComponent } from './itinerary';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';

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
    PostComponent,
    ProfileComponent,
    ProfileDetailsComponent,
    ItineraryComponent,
    ItinerarySummaryComponent,
    ItineraryDetailsComponent,
    ItineraryActivityComponent,
    ItineraryResourcesComponent,
    ItineraryNewComponent,
    SideNavigationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [AuthService, UserService, PostService, ItineraryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
