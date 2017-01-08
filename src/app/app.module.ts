import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';

import { AuthComponent, AuthService, SignupComponent, SigninComponent } from './auth';

import { UserService, UserComponent, ProfileComponent, ProfileDetailsComponent, FollowingComponent, FollowingService } from './user';

import { PostsComponent, PostComponent, PostInputComponent, PostListComponent, PostService } from './post';

import { ItineraryComponent, ItinerarySummaryComponent, ItineraryDetailsComponent, ItineraryService, ItineraryActivityComponent, ItineraryResourcesComponent, ResourceInputComponent, ResourceService, ResourceListComponent, ResourceComponent, ItineraryMapComponent, AccommodationFormComponent, TransportFormComponent } from './itinerary';

import { ActivityComponent, ActivityListComponent, ActivityInputComponent, ActivitiesComponent, ActivityCollapseComponent, ActivityCollapseListComponent } from './activities';

import { GoogleAPIComponent, GooglePlaceSearchComponent, GoogleCheckinComponent } from './google-api';
import { CustomCheckinComponent } from './custom-checkin/custom-checkin.component';

import { EventService } from './event';
import { FlashMessageComponent, FlashMessageService } from './flash-message';
import { NotificationComponent, NotificationsComponent, NotificationListComponent, NotificationService } from './notifications';

// import { ItineraryResolver } from './itinerary/itinerary.resolver';

// issue with feature module
// import { AuthModule } from './auth/auth.module';
// import { UserModule } from './user/user.module';
// import { PostModule } from './post/post.module';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    NavigationComponent,
    UserComponent,
    ProfileComponent,
    ProfileDetailsComponent,
    PostsComponent,
    PostInputComponent,
    PostListComponent,
    PostComponent,
    ItineraryComponent,
    ItinerarySummaryComponent,
    ItineraryDetailsComponent,
    ItineraryActivityComponent,
    ItineraryResourcesComponent,
    SideNavigationComponent,
    ResourceInputComponent,
    ResourceListComponent,
    ResourceComponent,
    ActivityComponent,
    ActivityListComponent,
    ActivityInputComponent,
    ActivitiesComponent,
    GoogleAPIComponent,
    GooglePlaceSearchComponent,
    GoogleCheckinComponent,
    CustomCheckinComponent,
    ItineraryMapComponent,
    ActivityCollapseComponent,
    ActivityCollapseListComponent,
    FlashMessageComponent,
    AccommodationFormComponent,
    TransportFormComponent,
    FollowingComponent,
    NotificationComponent,
    NotificationsComponent,
    NotificationListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
  ],
  providers: [ AuthService, UserService, PostService, ItineraryService, ResourceService, EventService, FlashMessageService, FollowingService, NotificationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
