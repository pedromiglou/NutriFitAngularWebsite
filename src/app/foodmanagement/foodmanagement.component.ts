import { Component, OnInit } from '@angular/core';
import {Food} from '../../Food';
import {Category} from '../../Category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServiceService} from '../auth-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {FoodService} from '../food.service';

@Component({
  selector: 'app-foodmanagement',
  templateUrl: './foodmanagement.component.html',
  styleUrls: ['./foodmanagement.component.css']
})

export class FoodmanagementComponent implements OnInit {
  a_e_Food: FormGroup;
  filterForm: FormGroup;
  categoryForm: FormGroup;
  public alimentos: Food[];
  public categories: Category[];
  public update = false;
  public add = true;
  public food_id: string;
  public alimentoInfo: Food;
  private new_delete: HTMLElement;
  public new: boolean;
  public del: boolean;
  private category: HTMLElement;
  public alert: string;
  public nome_categoria: any;
  public nome_alimento: string;
  public numPages: number;
  public currentPage = 1;
  private name = '';
  private categoryName = '';
  private protein_lower: number = null;
  private protein_higher: number = null;
  private hc_lower: number = null;
  private hc_higher: number = null;
  private fat_lower: number = null;
  private fat_higher: number = null;
  constructor(private authService: AuthServiceService, private router: Router, private route: ActivatedRoute,
              private cookieService: CookieService, private foodService: FoodService) { }

  ngOnInit(): void {
    this.init_a_Form();
    this.food_id = this.route.snapshot.paramMap.get('id');
    this.init_f_Form();
    this.init_category_form();
    this.reloadFood();
  }

  init_a_Form(): void{
    this.a_e_Food = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      calorias: new FormControl('', [Validators.required]),
      proteina: new FormControl('', [Validators.required]),
      hidratos_carbono: new FormControl('', [Validators.required]),
      gordura: new FormControl('', [Validators.required]),
    });
  }

  init_f_Form(): void {
    this.filterForm = new FormGroup({
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

  reloadFood(): void {
    if (this.food_id){
      this.update = true;
      this.add = false;
      this.foodService.getInfo(Number(this.food_id)).subscribe(x => {
          this.alimentoInfo = x;
          this.a_e_Food.setValue({nome: this.alimentoInfo.nome, categoria: this.alimentoInfo.categoria,
            calorias: this.alimentoInfo.calorias, proteina: this.alimentoInfo.proteina,
            hidratos_carbono: this.alimentoInfo.hidratos_carbono, gordura: this.alimentoInfo.gordura}); },
          error => this.router.navigateByUrl('login'));
    } else{
      this.update = false;
      this.add = true;
    }
    this.foodService.getAlimentos(this.name, this.categoryName, this.protein_lower, this.protein_higher, this.hc_lower,
      this.hc_higher, this.fat_lower, this.fat_higher, this.currentPage, null).subscribe(
      data => {this.alimentos = data.food; this.numPages = data.pages; },
      error => this.router.navigateByUrl('login')
    );
    this.foodService.getCategorias().subscribe(
      data => this.categories = data,
      error =>  this.router.navigateByUrl('login')
    );
  }

  submitFood(): void{
    if (this.a_e_Food.valid){
      if (this.add){
        this.foodService.addFood(this.a_e_Food.value).subscribe( () => {
          this.reloadFood();
          this.nome_alimento = this.a_e_Food.value.nome;
          document.getElementById('alerta_al_a').style.display = 'block';
        },
          error => this.router.navigateByUrl('login')
        );
      } else if (this.update){
        const food = this.a_e_Food.value;
        food.id = this.food_id;

        this.foodService.updateFood(food).subscribe( () => {
          this.reloadFood();
          this.router.navigateByUrl('foodManagement');
          this.nome_alimento = this.a_e_Food.value.nome;
          document.getElementById('alerta_al_u').style.display = 'block';
          },
          error => this.router.navigateByUrl('login')
        );
      }
    } else{
      alert('Form is invalid');
    }
  }

  redirect_updateFood(food_id: number): void{
    this.router.navigateByUrl('foodManagement/' + food_id);
  }

  removeFood(food_id: number, food_name: string): void{
    this.foodService.removeFood(food_id).subscribe( x => {
      this.reloadFood();
      this.nome_alimento = food_name;
      document.getElementById('alerta_al_r').style.display = 'block';
      },
      error => this.router.navigateByUrl('login')
    );
  }

  filterFood(): void {
    if (this.filterForm.valid){
      this.name = this.filterForm.value.name;
      this.categoryName = this.filterForm.value.category;
      this.protein_lower = this.filterForm.value.protein_lower;
      this.protein_higher = this.filterForm.value.protein_higher;
      this.hc_lower = this.filterForm.value.hc_lower;
      this.hc_higher = this.filterForm.value.hc_higher;
      this.fat_lower = this.filterForm.value.fat_lower;
      this.fat_higher = this.filterForm.value.fat_higher;
      this.currentPage = 1;
      this.foodService.getAlimentos(this.name, this.categoryName, this.protein_lower, this.protein_higher, this.hc_lower, this.hc_higher,
        this.fat_lower, this.fat_higher, this.currentPage, null).subscribe(
          data => {this.alimentos = data.food; this.numPages = data.pages},
        error => this.router.navigateByUrl('login')
      );
    }else{
      alert('Form is invalid!');
    }
  }

  new_category(): void{
    this.init_category_form();
    this.category = document.getElementById('category');
    this.category.style.display = 'none';

    this.new_delete = document.getElementById('n_d');
    if (this.new_delete.style.display === 'none'){

      this.new_delete.style.display = 'block';
    }
    this.new = true;
    this.del = false;
  }
  remove_category(): void{
    this.init_category_form();
    this.foodService.getCategorias().subscribe(
      data => this.categories = data,
      error =>  this.router.navigateByUrl('login')
    );
    this.category = document.getElementById('category');
    this.category.style.display = 'none';

    this.new_delete = document.getElementById('n_d');
    if (this.new_delete.style.display === 'none'){
      this.new_delete.style.display = 'block';
    }
    this.new = false;
    this.del = true;
  }
  init_category_form(): void{
    this.categoryForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
    });
  }
  cancel_c(): void{
    this.category = document.getElementById('category');
    this.category.style.display = 'block';

    this.new_delete = document.getElementById('n_d');
    if (this.new_delete.style.display === 'block'){
      this.new_delete.style.display = 'none';
    }
    this.new = false;
    this.del = false;
  }

  confirm_n_d_category(): void{
    if (this.categoryForm.valid){
      if (this.del){
        for (const category of this.categories) {
          if (category.nome === this.categoryForm.value.nome){
            const id = category.id;

            this.foodService.del_category(id).subscribe(x => {
                this.category.style.display = 'block';
                this.new_delete.style.display = 'none';
                this.foodService.getCategorias().subscribe(
                  data => this.categories = data,
                  error =>  this.router.navigateByUrl('login')
                );
                this.nome_categoria = this.categoryForm.value.nome;
                document.getElementById('alerta_r').style.display = 'block';
                }
                , error => this.router.navigateByUrl('login'));
          }
        }
      } else if (this.new){
        this.foodService.new_category(this.categoryForm.value).subscribe(x => {
            this.category.style.display = 'block';
            this.new_delete.style.display = 'none';
            this.foodService.getCategorias().subscribe(
              data => this.categories = data,
              error =>  this.router.navigateByUrl('login')
            );
            this.nome_categoria = this.categoryForm.value.nome;
            document.getElementById('alerta_a').style.display = 'block';
            }
          , error => this.router.navigateByUrl('login'));
      }
    }
    else{
      alert('Form is invalid!');
    }
  }

  removeAlert(name: string): void{
    if (name === 'alerta_r'){
      document.getElementById('alerta_r').style.display = 'none';
    } else if (name === 'alerta_a'){
      document.getElementById('alerta_a').style.display = 'none';
    } else if (name === 'alerta_al_r'){
      document.getElementById('alerta_al_r').style.display = 'none';
    } else if (name === 'alerta_al_u'){
      document.getElementById('alerta_al_u').style.display = 'none';
    } else if (name === 'alerta_al_a'){
      document.getElementById('alerta_al_a').style.display = 'none';
    }
  }

  pageUp(): void{
    this.currentPage += 1;
    this.foodService.getAlimentos(this.name, this.categoryName, this.protein_lower, this.protein_higher, this.hc_lower,
      this.hc_higher, this.fat_lower, this.fat_higher, this.currentPage, null).subscribe(
      data => {this.alimentos = data.food; this.numPages = data.pages; },
      error => this.router.navigateByUrl('login')
    );
  }

  pageDown(): void{
    this.currentPage -= 1;
    this.foodService.getAlimentos(this.name, this.categoryName, this.protein_lower, this.protein_higher, this.hc_lower,
      this.hc_higher, this.fat_lower, this.fat_higher, this.currentPage, null).subscribe(
      data => {this.alimentos = data.food; this.numPages = data.pages; },
      error => this.router.navigateByUrl('login')
    );
  }

}
