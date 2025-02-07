  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { RegisterComponent } from './auth/register/register.component';
  import {LoginComponent} from "./auth/login/login.component";
  import {ProfileComponent} from "./profile/profile.component";

  export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '', redirectTo: 'register', pathMatch: 'full' },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
