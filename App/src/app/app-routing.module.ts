import {NgModule} from '@angular/core';

import {AuthenticationGuard} from './guards/authentication.guard';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/welcome/welcome.module').then(m => m.WelcomeModule),
    // canActivate: [AuthenticationGuard]
  },
  {
    path: 'events',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
