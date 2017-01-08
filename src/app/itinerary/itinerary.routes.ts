import { Routes } from "@angular/router";

import { ItinerarySummaryComponent }   from './itinerary-details/itinerary-summary/itinerary-summary.component';
import { ItineraryActivityComponent }  from './itinerary-details/itinerary-activity/itinerary-activity.component';
import { ItineraryResourcesComponent } from './itinerary-details/itinerary-resources/itinerary-resources.component';
import { ItineraryMapComponent }       from './itinerary-details/itinerary-map/itinerary-map.component';
// import { ItineraryResolver } from './itinerary.resolver';

export const ITINERARY_ROUTES: Routes = [
  { path: '', redirectTo: 'accommodation-transport', pathMatch: 'full' },
  { path: 'accommodation-transport', component: ItinerarySummaryComponent },
  { path: 'activities', component: ItineraryActivityComponent },
  { path: 'resources', component: ItineraryResourcesComponent },
  { path: 'map', component: ItineraryMapComponent },

]
