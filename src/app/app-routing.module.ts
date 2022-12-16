import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { PolicyComponent } from './policy/policy.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:ClientComponent},
  {path:'policy/:userId',component:PolicyComponent, canActivate:[AuthGuardService] },   
  {path: '', redirectTo: 'home', pathMatch: 'full' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
