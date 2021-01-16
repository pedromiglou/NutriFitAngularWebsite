import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseURL} from '../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {AuthServiceService} from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor(private http: HttpClient, private authService: AuthServiceService, private cookieService: CookieService) {}

  updateBMI(data): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.put( baseURL + '/updateBMI/', data, httpOptions);
  }

  updateCI(data): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.put( baseURL + '/updateCI/', data, httpOptions);
  }
}
