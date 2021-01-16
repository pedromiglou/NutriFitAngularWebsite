import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseURL} from '../environments/environment';
import {DailyStats} from '../DailyStats';
import {CookieService} from 'ngx-cookie-service';
import {AuthServiceService} from './auth-service.service';
import {Composed} from '../Composed';

@Injectable({
  providedIn: 'root'
})
export class DailyService {

  constructor(private http: HttpClient, private authService: AuthServiceService, private cookieService: CookieService) {}

  getDailyStats(data): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.get<DailyStats>(baseURL + '/statistics?date=' + data, httpOptions);
  }

  getMeal(type, data): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.get<Composed>(baseURL + '/getmeal?data=' + data + '&type=' + type, httpOptions);
  }

  deleteComposta(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.authService.token
      })
    };
    return this.http.delete<any>(baseURL + '/deletefoodfrommeal/' + id, httpOptions);
  }
}
