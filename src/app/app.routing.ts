import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth';
import { HomeComponent } from './home';
import { ProfileComponent } from './user';
import { ItineraryComponent, ItineraryNewComponent, ITINERARY_ROUTES } from './itinerary';

const APP_ROUTES: Routes = [
  { path: '', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'newItinerary', component: ItineraryNewComponent },
  { path: 'itinerary/:id', component: ItineraryComponent, children: ITINERARY_ROUTES }
]

export const routing = RouterModule.forRoot(APP_ROUTES)
