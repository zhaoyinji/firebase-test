import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';
import { AuthGuard } from './services/auth.service';
import { FirebaseService } from './services/firebase.service';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MembersComponent } from './components/members/members.component';
import { EmailComponent } from './components/email/email.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'email', component: EmailComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'members', component: MembersComponent, canActivate: [AuthGuard]},
  {path: 'listings', component: ListingsComponent, canActivate: [AuthGuard]},
  {path: 'add-listing', component: AddListingComponent, canActivate: [AuthGuard]},
  {path: 'listing/:id', component: ListingComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
    LoginComponent,
    SignupComponent,
    MembersComponent,
    EmailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FlashMessagesModule
  ],
  providers: [FirebaseService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
