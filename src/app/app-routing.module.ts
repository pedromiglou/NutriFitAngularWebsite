import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {SignInComponent} from "./sign-in/sign-in.component";
import {LoginComponent} from "./login/login.component";
import {CalculatorsComponent} from "./calculators/calculators.component";
import {DailyComponent} from './daily/daily.component';
import {BMIresultsComponent} from "./bmiresults/bmiresults.component";
import {CIresultsComponent} from "./ciresults/ciresults.component";
import {MealComponent} from "./meal/meal.component";
import {ValidateFoodComponent} from "./validate-food/validate-food.component";
import {ProfileComponent} from "./profile/profile.component";
import {FoodmanagementComponent} from "./foodmanagement/foodmanagement.component";
import {UsermanagementComponent} from "./usermanagement/usermanagement.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'calculateBMI_CI', component: CalculatorsComponent},
  {path: 'foodManagement', component: FoodmanagementComponent},
  {path: 'foodManagement/:id', component: FoodmanagementComponent},
  {path: 'userManagement', component: UsermanagementComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'daily', component: DailyComponent},
  {path: 'BMIresults', component: BMIresultsComponent},
  {path: 'CIresults', component: CIresultsComponent},
  {path: 'meal', component: MealComponent},
  {path: 'confirmFood', component: CalculatorsComponent},
  {path: 'validateFood', component: ValidateFoodComponent},
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
