import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateShortLinkComponent } from './create-short-link/create-short-link.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { RegisterComponent } from './register/register.component';
import { ShorturlredirectComponent } from './shorturlredirect/shorturlredirect.component';

const routes: Routes = [
  { path: 'url/:id', component: ShorturlredirectComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: CreateShortLinkComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'register', component: RegisterComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
