import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home'

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent }
]

export const routing = RouterModule.forRoot(APP_ROUTES) 
