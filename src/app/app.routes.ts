  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { RegisterComponent } from './auth/register/register.component';
  import {LoginComponent} from "./auth/login/login.component";
  import {ProfileComponent} from "./profile/profile.component";
  import {EditProfileComponent} from "./profile/edit-profile/edit-profile.component";
  import {SubmitRequestComponent} from "./collection/submit-request/submit-request.component";
  import {MyRequestsComponent} from "./collection/my-requests/my-requests.component";
  import {CollectorDashboardComponent} from "./collection/collector-dashboard/collector-dashboard.component";

  export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'profile/edit', component: EditProfileComponent },
    { path: 'collection/submit', component: SubmitRequestComponent },
    { path: 'collection/my-requests', component: MyRequestsComponent },
    { path: 'collection/dashboard', component: CollectorDashboardComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
