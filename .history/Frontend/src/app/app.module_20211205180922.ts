import { UserService } from './../services/user.service';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { HousingService } from './../services/housing.service';
import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRegisterComponent } from './user/user/user-register/user-register.component';
import { UserLoginComponent } from './user/user/user-login/user-login.component';
import { AlertifyService } from 'src/services/alertify.service';
import { AuthService } from 'src/services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


const appRoutes: Routes = [
  {
    path: '',
    component: PropertyListComponent
  },
  {
    path: 'add-property',
    component: AddPropertyComponent
  },
  {
    path: 'rent-property',
    component: PropertyListComponent
  },
  {
    path: 'property-detail/:Id',
    component: PropertyDetailComponent
  },
  {
    path: 'user/login',
    component: UserLoginComponent
  },
  {
    path: 'user/register',
    component: UserRegisterComponent
  },
]
@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    NavBarComponent,
    AddPropertyComponent,
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [HousingService, UserService, AlertifyService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
