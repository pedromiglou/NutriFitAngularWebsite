import { Component, OnInit } from '@angular/core';
import {DailyService} from '../daily.service';
import {formatDate} from '@angular/common';
import {DailyStats} from '../../DailyStats';
import {AuthServiceService} from '../auth-service.service';
import {Router} from '@angular/router';
import {Composed} from '../../Composed';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css'],
})
export class DailyComponent implements OnInit {
  public today: string;
  public stats: DailyStats;
  public percentage_calories: number;
  public percentage_protein: number;
  public percentage_carbohydrates: number;
  public percentage_fat: number;
  public yesterday = '';
  public tomorrow = '';
  public breakfast: Composed[];
  public lunch: Composed[];
  public snack: Composed[];
  public dinner: Composed[];
  private d: Date;
  public breakfast_id: number;
  public lunch_id: number;
  public snack_id: number;
  public dinner_id: number;

  constructor(private service: DailyService, private authService: AuthServiceService, private router: Router,
              private cookieService: CookieService) {}

  reloadMeals(): void {
    this.service.getDailyStats(this.today).subscribe(x => {
        this.stats = x;
        this.percentage_calories = this.stats.cc / this.stats.ci * 100;
        this.percentage_protein = this.stats.pc / this.stats.pi * 100;
        this.percentage_carbohydrates = this.stats.hc / this.stats.hi * 100;
        this.percentage_fat = this.stats.gc / this.stats.gi * 100;
        if (this.percentage_calories > 100) {this.percentage_calories = 100; }
        if (this.percentage_protein > 100) {this.percentage_protein = 100; }
        if (this.percentage_carbohydrates > 100) {this.percentage_carbohydrates = 100; }
        if (this.percentage_fat > 100) {this.percentage_fat = 100; }
      },
      error => this.router.navigateByUrl('login')
    );

    this.service.getMeal('breakfast', this.today).subscribe(x => {
        this.breakfast = x.meal;
        this.breakfast_id = x.meal_id;
      },
      error => this.router.navigateByUrl('login')
    );

    this.service.getMeal('lunch', this.today).subscribe(y => {
        this.lunch = y.meal;
        this.lunch_id = y.meal_id;
      },
      error => this.router.navigateByUrl('login')
    );

    this.service.getMeal('snack', this.today).subscribe(z => {
        this.snack = z.meal;
        this.snack_id = z.meal_id;
      },
      error => this.router.navigateByUrl('login')
    );

    this.service.getMeal('dinner', this.today).subscribe(w => {
        this.dinner = w.meal;
        this.dinner_id = w.meal_id;
      },
      error => this.router.navigateByUrl('login')
    );
  }

  ngOnInit(): void {
    this.stats = new DailyStats();
    this.d = new Date();
    this.today = formatDate(this.d, 'yyyy-MM-dd', 'en');
    const yd = new Date();
    yd.setDate(this.d.getDate() - 1);
    this.yesterday = formatDate(yd, 'yyyy-MM-dd', 'en');
    const td = new Date();
    td.setDate(this.d.getDate() + 1);
    this.tomorrow = formatDate(td, 'yyyy-MM-dd', 'en');

    this.reloadMeals();

  }

  goToYesterday(): void {
    this.d.setDate(this.d.getDate() - 1);
    this.today = formatDate(this.d, 'yyyy-MM-dd', 'en');
    const yd = new Date();
    yd.setDate(this.d.getDate() - 1);
    this.yesterday = formatDate(yd, 'yyyy-MM-dd', 'en');
    const td = new Date();
    td.setDate(this.d.getDate() + 1);
    this.tomorrow = formatDate(td, 'yyyy-MM-dd', 'en');

    this.reloadMeals();
  }

  goToTomorrow(): void {
    this.d.setDate(this.d.getDate() + 1);
    this.today = formatDate(this.d, 'yyyy-MM-dd', 'en');
    const yd = new Date();
    yd.setDate(this.d.getDate() - 1);
    this.yesterday = formatDate(yd, 'yyyy-MM-dd', 'en');
    const td = new Date();
    td.setDate(this.d.getDate() + 1);
    this.tomorrow = formatDate(td, 'yyyy-MM-dd', 'en');

    this.reloadMeals();
  }

  addFood(meal_name, meal_id): void{
    console.log('A');
    this.cookieService.set('meal_name', meal_name);
    this.cookieService.set('meal_id', meal_id);
    this.cookieService.set('date', this.today);
    this.router.navigateByUrl('meal');
  }

  deleteComposed(id): void {
    this.service.deleteComposta(id).subscribe(() => this.reloadMeals(), error => this.router.navigateByUrl('login'));
  }

  updateComposed(food_id, id, meal_id): void {
    this.cookieService.set('validateFoodMode', 'update');
    this.cookieService.set('composed_id', String(id));
    this.cookieService.set('food_id', String(food_id));
    this.cookieService.set('meal_id', String(meal_id));
    this.router.navigateByUrl('validateFood');
  }
}
