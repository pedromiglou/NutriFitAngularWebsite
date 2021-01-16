import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs/Internal/Observable';
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

  getAlimentos(name?: string, category?: string, protein_lower?: string, protein_higher?: string,
               hc_lower?: string, hc_higher?: string, fat_lower?: string, fat_higher?: string): Observable<Food[]>{
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
    if (protein_lower !== '' && protein_lower !== null){
      if (query === ''){
        query = query + '?protein_lower=' + protein_lower.toString();
      }else{
        query = query + '&protein_lower=' + protein_lower.toString();
      }
    }
    if (protein_higher !== '' && protein_higher !== null){
      if (query === ''){
        query = query + '?protein_higher=' + protein_higher.toString();
      }else{
        query = query + '&protein_higher=' + protein_higher.toString();
      }
    }
    if (hc_lower !== '' && hc_lower !== null){
      if (query === ''){
        query = query + '?hc_lower=' + hc_lower.toString();
      }else{
        query = query + '&hc_lower=' + hc_lower.toString();
      }
    }
    if (hc_higher !== '' && hc_higher !== null){
      if (query === ''){
        query = query + '?hc_higher=' + hc_higher.toString();
      }else{
        query = query + '&hc_higher=' + hc_higher.toString();
      }
    }
    if (fat_lower !== '' && fat_lower !== null){
      if (query === ''){
        query = query + '?fat_lower=' + fat_lower.toString();
      }else{
        query = query + '&fat_lower=' + fat_lower.toString();
      }
    }
    if (fat_higher !== '' && fat_higher !== null){
      if (query === ''){
        query = query + '?fat_higher=' + fat_higher.toString();
      }else{
        query = query + '&fat_higher=' + fat_higher.toString();
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
}
