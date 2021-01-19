import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FoodService} from '../food.service';
import {AuthServiceService} from '../auth-service.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Food} from '../../Food';

@Component({
  selector: 'app-validate-food',
  templateUrl: './validate-food.component.html',
  styleUrls: ['./validate-food.component.css']
})
export class ValidateFoodComponent implements OnInit {
  formValidate: FormGroup;
  private food_id: number;
  private meal_id: number;
  public alimentoInfo: Food;
  private mode: string;
  private composed_id: number;

  constructor(private foodService: FoodService, private authService: AuthServiceService, private router: Router,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    this.initForm();
    this.mode = this.cookieService.get('validateFoodMode');
    this.food_id = Number(this.cookieService.get('food_id'));
    this.meal_id = Number(this.cookieService.get('meal_id'));
    this.foodService.getInfo(this.food_id).subscribe(x => this.alimentoInfo = x,
      error => this.router.navigateByUrl('login'));
    if (this.mode === 'create') {
    } else if (this.mode === 'update') {
      this.composed_id = Number(this.cookieService.get('composed_id'));
    } else {
      this.router.navigateByUrl('daily');
    }
  }

  initForm(): void{
    this.formValidate = new FormGroup({
      quantity: new FormControl('', [Validators.required]),
    });
  }

  validateFood(): void{
    if (this.formValidate.valid){
      if (this.mode === 'create') {
        const data = {refeicao: this.meal_id, alimento: this.food_id, quantidade: this.formValidate.value.quantity};
        this.foodService.addFoodToMeal(data).subscribe(sucess => this.router.navigateByUrl('daily'),
          error => this.router.navigateByUrl('login'));
      } else {
        const data = {id: this.composed_id, refeicao: this.meal_id, alimento: this.food_id, quantidade: this.formValidate.value.quantity};
        this.foodService.updateFoodToMeal(data).subscribe(sucess => this.router.navigateByUrl('daily'),
          error => this.router.navigateByUrl('login'));
      }
    }else{
      alert('Form is invalid!');
    }
  }
}
