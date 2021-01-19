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
  constructor(private foodService: FoodService, private authService: AuthServiceService, private router: Router,
              private cookieService: CookieService) {}

  ngOnInit(): void {
    this.foodService.getAlimentos('', '', '', '', '',
      '', '', '').subscribe(data => this.alimentos = data,
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
      protein_lower: new FormControl(''),
      protein_higher: new FormControl(''),
      hc_lower: new FormControl(''),
      hc_higher: new FormControl(''),
      fat_lower: new FormControl(''),
      fat_higher: new FormControl(''),
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
      let name = this.formMeal.value.name;
      let category = this.formMeal.value.category;
      let protein_lower = this.formMeal.value.protein_lower;
      let protein_higher = this.formMeal.value.protein_higher;
      let hc_lower = this.formMeal.value.hc_lower;
      let hc_higher = this.formMeal.value.hc_higher;
      let fat_lower = this.formMeal.value.fat_lower;
      let fat_higher = this.formMeal.value.fat_higher;
      this.foodService.getAlimentos(name, category, protein_lower, protein_higher, hc_lower, hc_higher,
        fat_lower, fat_higher).subscribe(data => this.alimentos = data,
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
}
