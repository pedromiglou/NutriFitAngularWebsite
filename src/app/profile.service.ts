import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthServiceService} from "./auth-service.service";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs/Internal/Observable";
import {User} from "../User";
import {baseURL} from "../environments/environment";
import {Profile} from '../Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private authService: AuthServiceService, private cookieService: CookieService) { }

  getUser(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.get<User>(baseURL + '/getuser', httpOptions);
  }
  setUser(data): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.put<User>(baseURL + '/setuser', data, httpOptions);
  }
  getGoals(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.get<Profile>(baseURL + '/getprofile', httpOptions);
  }
  setGoals(data): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.put<Profile>(baseURL + '/updateprofile', data, httpOptions);
  }
  changePassword(data): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.put(baseURL + '/setpassword', data, httpOptions);
  }
}
