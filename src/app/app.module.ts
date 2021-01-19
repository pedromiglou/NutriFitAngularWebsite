import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CalculatorsComponent } from './calculators/calculators.component';
import { DailyComponent } from './daily/daily.component';
import { BMIresultsComponent } from './bmiresults/bmiresults.component';
import { CIresultsComponent } from './ciresults/ciresults.component';
import {CookieService} from 'ngx-cookie-service';
import { MealComponent } from './meal/meal.component';
import { ValidateFoodComponent } from './validate-food/validate-food.component';
import { ProfileComponent } from './profile/profile.component';
import {AuthServiceService} from './auth-service.service';
import { FoodmanagementComponent } from './foodmanagement/foodmanagement.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignInComponent,
    CalculatorsComponent,
    DailyComponent,
    BMIresultsComponent,
    CIresultsComponent,
    MealComponent,
    ValidateFoodComponent,
    ProfileComponent,
    FoodmanagementComponent,
    UsermanagementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService, AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
