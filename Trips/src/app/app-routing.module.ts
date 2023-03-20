import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainpageComponent} from "./component/mainpage/mainpage.component";
import {ListOfTripsComponent} from "./component/list-of-trips/list-of-trips.component";
import {PageNotFoundComponent} from "./component/page-not-found/page-not-found.component";
import {AddNewTripComponent} from "./component/add-new-trip/add-new-trip.component";
import {CartComponent} from "./component/cart/cart.component";
import {SingleTripComponent} from "./component/single-trip/single-trip.component";
import { SignupComponent } from './component/signup/signup.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { AdminPageComponent } from './Admin/admin-page/admin-page.component';
import { ManagerPageComponent } from './Manager/manager-page/manager-page.component';
import { SingleTripManagerComponent } from './Manager/single-trip-manager/single-trip-manager.component';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';
import { ManagerGuard } from './guards/manager.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {path: 'mainpage', component: MainpageComponent},
  {path: 'add', component: AddNewTripComponent, canActivate: [LoginGuard, ManagerGuard]},
  {path: 'cart', component: CartComponent,  canActivate: [LoginGuard]},
  {path: 'admin', component: AdminPageComponent, canActivate : [LoginGuard, AdminGuard]},
  {path: 'manager', component: ManagerPageComponent , canActivate: [LoginGuard, ManagerGuard]},
  {path: 'edit/:num', component: SingleTripManagerComponent , canActivate: [LoginGuard, ManagerGuard]},
  {path: 'signup', component: SignupComponent , canActivate: [GuestGuard]},
  {path: 'login', component: LoginPageComponent , canActivate: [GuestGuard]},
  {path: 'trips', component: ListOfTripsComponent},
  {path: 'trip/:num', component: SingleTripComponent, canActivate: [LoginGuard]},
  {path: '', redirectTo: '/mainpage', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
