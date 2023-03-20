import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripComponent } from './component/trip/trip.component';
import { ListOfTripsComponent } from './component/list-of-trips/list-of-trips.component';
import { CartComponent } from './component/cart/cart.component';
import { FilterPipe } from './filter-pipe/filter.pipe';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddNewTripComponent } from './component/add-new-trip/add-new-trip.component';
import { NavMenuComponent } from './component/nav-menu/nav-menu.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { MainpageComponent } from './component/mainpage/mainpage.component';
import { MainMenuComponent } from './component/main-menu/main-menu.component';
import { SingleTripComponent } from './component/single-trip/single-trip.component';
import { AngularFireDatabaseModule} from "@angular/fire/compat/database";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "../environments/environment";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AddReviewComponent } from './component/add-review/add-review.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { AdminPageComponent } from './Admin/admin-page/admin-page.component';
import { UsersComponent } from './Admin/users/users.component';
import { ManagerPageComponent } from './Manager/manager-page/manager-page.component';
import { ManagerTripComponent } from './Manager/manager-trip/manager-trip.component';
import { ChangeTripComponent } from './Manager/change-trip/change-trip.component';
import { SingleTripManagerComponent } from './Manager/single-trip-manager/single-trip-manager.component';
import { PersistenceComponent } from './Admin/persistence/persistence.component';

@NgModule({
  declarations: [
    AppComponent,
    TripComponent,
    ListOfTripsComponent,
    CartComponent,
    FilterPipe,
    AddNewTripComponent,
    NavMenuComponent,
    PageNotFoundComponent,
    MainpageComponent,
    MainMenuComponent,
    SingleTripComponent,
    AddReviewComponent,
    SignupComponent,
    LoginPageComponent,
    AdminPageComponent,
    UsersComponent,
    ManagerPageComponent,
    ManagerTripComponent,
    ChangeTripComponent,
    SingleTripManagerComponent,
    PersistenceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSliderModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase), 

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
