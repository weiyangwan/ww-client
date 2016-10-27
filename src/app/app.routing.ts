import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth';
import { HomeComponent } from './home';

const APP_ROUTES: Routes = [
  { path: '', component: AuthComponent },
  { path: 'home', component: HomeComponent }
]

export const routing = RouterModule.forRoot(APP_ROUTES)
