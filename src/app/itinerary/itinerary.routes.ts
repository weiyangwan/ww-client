import { Routes } from "@angular/router";

import { ItinerarySummaryComponent } from './itinerary-details/itinerary-summary/itinerary-summary.component';
import { ItineraryActivityComponent } from './itinerary-details/itinerary-activity/itinerary-activity.component';
import { ItineraryResourcesComponent } from './itinerary-details/itinerary-resources/itinerary-resources.component';
import { ItineraryNewComponent } from './itinerary-new/itinerary-new.component';
import { ItineraryResolver } from './itinerary.resolver';

export const ITINERARY_ROUTES: Routes = [
  { path: '', redirectTo: 'summary', pathMatch: 'full' },
  { path: 'new', component: ItineraryNewComponent },
  { path: 'summary', component: ItinerarySummaryComponent },
  { path: 'activity', component: ItineraryActivityComponent },
  { path: 'resources', component: ItineraryResourcesComponent },
]
