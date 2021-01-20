import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FoodService} from '../food.service';
import {AuthServiceService} from '../auth-service.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Category} from '../../Category';
import {Food} from '../../Food';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
  formMeal: FormGroup;
  public alimentos: Food[];
  public categories: Category[];
  public meal_name: string;
  public meal_data: string;
  public meal_id: string;
  public numPages: number;
  public currentPage = 1;
  private name = '';
  private category = '';
  private protein_lower: number = null;
  private protein_higher: number = null;
  private hc_lower: number = null;
  private hc_higher: number = null;
  private fat_lower: number = null;
  private fat_higher: number = null;
  constructor(private foodService: FoodService, private authService: AuthServiceService, private router: Router,
              private cookieService: CookieService) {}

  ngOnInit(): void {
    this.foodService.getAlimentos(this.name, this.category, this.protein_lower, this.protein_higher, this.hc_lower,
      this.hc_higher, this.fat_lower, this.fat_higher, this.currentPage, null).subscribe(
      data => {this.alimentos = data.food; this.numPages = data.pages; },
      error => this.router.navigateByUrl('login')
    );

    this.getCategorias();
    this.meal_name = this.cookieService.get('meal_name');
    this.meal_data = this.cookieService.get('date');
    this.meal_id = this.cookieService.get('meal_id');
    this.initForm();
  }

  initForm(): void {
    this.formMeal = new FormGroup({
      name: new FormControl(''),
      category: new FormControl(''),
      protein_lower: new FormControl(null),
      protein_higher: new FormControl(null),
      hc_lower: new FormControl(null),
      hc_higher: new FormControl(null),
      fat_lower: new FormControl(null),
      fat_higher: new FormControl(null),
    });
  }

  getCategorias(): void{
    this.foodService.getCategorias().subscribe(
      data => this.categories = data,
      error =>  this.router.navigateByUrl('login')
    );
  }

  getFood(): void {
    if (this.formMeal.valid){
      this.name = this.formMeal.value.name;
      this.category = this.formMeal.value.category;
      this.protein_lower = this.formMeal.value.protein_lower;
      this.protein_higher = this.formMeal.value.protein_higher;
      this.hc_lower = this.formMeal.value.hc_lower;
      this.hc_higher = this.formMeal.value.hc_higher;
      this.fat_lower = this.formMeal.value.fat_lower;
      this.fat_higher = this.formMeal.value.fat_higher;
      this.currentPage = 1;
      this.foodService.getAlimentos(name, this.category, this.protein_lower, this.protein_higher, this.hc_lower,
        this.hc_higher, this.fat_lower, this.fat_higher, this.currentPage, null).subscribe(
          data => {this.alimentos = data.food; this.numPages = data.pages; },
        error => this.router.navigateByUrl('login')
        );
    }else{
      alert('Form is invalid!');
    }
  }

  validateFood(food_id: string): void {
    this.cookieService.set('food_id', food_id);
    this.cookieService.set('validateFoodMode', 'create');
    this.router.navigateByUrl('validateFood');
  }

  Back(): void{
    this.router.navigateByUrl('daily');
  }

  pageUp(): void{
    this.currentPage += 1;
    this.foodService.getAlimentos(this.name, this.category, this.protein_lower, this.protein_higher, this.hc_lower,
      this.hc_higher, this.fat_lower, this.fat_higher, this.currentPage, null).subscribe(
      data => {this.alimentos = data.food; this.numPages = data.pages; },
      error => this.router.navigateByUrl('login')
    );
  }

  pageDown(): void{
    this.currentPage -= 1;
    this.foodService.getAlimentos(this.name, this.category, this.protein_lower, this.protein_higher, this.hc_lower,
      this.hc_higher, this.fat_lower, this.fat_higher, this.currentPage, null).subscribe(
      data => {this.alimentos = data.food; this.numPages = data.pages; },
      error => this.router.navigateByUrl('login')
    );
  }
}
