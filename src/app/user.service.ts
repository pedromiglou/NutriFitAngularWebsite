import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthServiceService} from './auth-service.service';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {baseURL} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthServiceService, private cookieService: CookieService) { }

  getUsers(name?: string, staff?: string, superUser?: string, page?: number, size?: number): Observable<any>{
    let query = '';

    if (name !== '' && name !== null){
      if (query === ''){
        query = query + '?name=' + name;
      }else{
        query = query + '&name=' + name;
      }
    }
    if (staff !== '' && staff !== null){
      if (query === ''){
        query = query + '?staff=' + staff;
      }else{
        query = query + '&staff=' + staff;
      }
    }
    if (superUser !== '' && superUser !== null){
      if (query === ''){
        query = query + '?superUser=' + superUser;
      }else{
        query = query + '&superUser=' + superUser;
      }
    }
    if (page !== null){
      if (query === ''){
        query = query + '?page=' + page;
      }else{
        query = query + '&page=' + page;
      }
    }
    if (size !== null){
      if (query === ''){
        query = query + '?size=' + size;
      }else{
        query = query + '&size=' + size;
      }
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    console.log(baseURL + '/getusers' + query);
    return this.http.get<any>(baseURL + '/getusers' + query, httpOptions);
  }

  promoteUser(data): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.put<any>(baseURL + '/upgradeuser', data, httpOptions);
  }

  downgradeUser(data): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.put<any>(baseURL + '/downgradeuser', data, httpOptions);
  }
}
