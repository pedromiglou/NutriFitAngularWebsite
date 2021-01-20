import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {baseURL} from '../environments/environment';
import {Category} from '../Category';
import {AuthServiceService} from './auth-service.service';
import {Food} from '../Food';

@Injectable({
  providedIn: 'root'
})

export class FoodService {

  constructor(private http: HttpClient, private cookieService: CookieService,
              private authService: AuthServiceService) {}

  getCategorias(): Observable<Category[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.get<Category[]>( baseURL + '/getcategories', httpOptions);
  }

  getAlimentos(name?: string, category?: string, protein_lower?: number, protein_higher?: number,
               hc_lower?: number, hc_higher?: number, fat_lower?: number, fat_higher?: number,
               page?: number, size?: number): Observable<any>{
    let query = '';

    if (name !== '' && name !== null){
      if (query === ''){
        query = query + '?name=' + name;
      }else{
        query = query + '&name=' + name;
      }
    }
    if (category !== '' && category !== null){
      if (query === ''){
        query = query + '?category=' + category;
      }else{
        query = query + '&category=' + category;
      }
    }
    if (protein_lower !== null){
      if (query === ''){
        query = query + '?protein_lower=' + protein_lower.toString();
      }else{
        query = query + '&protein_lower=' + protein_lower.toString();
      }
    }
    if (protein_higher !== null){
      if (query === ''){
        query = query + '?protein_higher=' + protein_higher.toString();
      }else{
        query = query + '&protein_higher=' + protein_higher.toString();
      }
    }
    if (hc_lower !== null){
      if (query === ''){
        query = query + '?hc_lower=' + hc_lower.toString();
      }else{
        query = query + '&hc_lower=' + hc_lower.toString();
      }
    }
    if (hc_higher !== null){
      if (query === ''){
        query = query + '?hc_higher=' + hc_higher.toString();
      }else{
        query = query + '&hc_higher=' + hc_higher.toString();
      }
    }
    if (fat_lower !== null){
      if (query === ''){
        query = query + '?fat_lower=' + fat_lower.toString();
      }else{
        query = query + '&fat_lower=' + fat_lower.toString();
      }
    }
    if (fat_higher !== null){
      if (query === ''){
        query = query + '?fat_higher=' + fat_higher.toString();
      }else{
        query = query + '&fat_higher=' + fat_higher.toString();
      }
    }
    if (page !== null){
      if (query === ''){
        query = query + '?page=' + page.toString();
      }else{
        query = query + '&page=' + page.toString();
      }
    }
    if (size !== null){
      if (query === ''){
        query = query + '?size=' + size.toString();
      }else{
        query = query + '&size=' + size.toString();
      }
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.get<Food[]>( baseURL + '/getfoodlist' + query, httpOptions);
  }

  addFoodToMeal(data): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.post( baseURL + '/addfoodtomeal', data, httpOptions);
  }

  updateFoodToMeal(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.put( baseURL + '/updatefoodtomeal', data, httpOptions);
  }

  getInfo(id): Observable<Food>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.get<Food>(baseURL + '/getfood?id=' + id, httpOptions);
  }

  addFood(data): Observable<Food>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.post<Food>(baseURL + '/addfood', data, httpOptions);
  }

  updateFood(data): Observable<Food>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.put<Food>(baseURL + '/updatefood', data, httpOptions);
  }

  removeFood(food_id): Observable<Food>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.delete<Food>(baseURL + '/deletefood/' + food_id, httpOptions);
  }

  del_category(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.delete<Category>(baseURL + '/deletecategory/' + id, httpOptions);
  }
  new_category(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.post<Category>(baseURL + '/postcategory', data, httpOptions);
  }
}
