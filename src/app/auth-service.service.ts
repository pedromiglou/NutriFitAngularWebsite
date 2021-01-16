import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseURL} from '../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // http options used for making API calls
  private httpOptions: any;

  // the actual JWT token
  public token: string;

  // the token expiration date
  public token_expires: Date;

  // the username of the logged in user
  public username: string;

  // error messages received from the login attempt
  public errors: any = [];

  public logged = false;
  public permissions: any = {food: false, user: false};

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.token = this.cookieService.get('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.token
      })
    };

    if (this.token !== '') {
      this.http.get(baseURL + '/getpermissions', httpOptions).subscribe(
        p => {this.permissions = p; this.logged = true; },
        error => {this.logged = false; this.permissions = {food: false, user: false}; }
      );
    } else {
      this.logged = false;
      this.permissions = {food: false, user: false};
    }
  }

  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user): Observable<any> {
    return this.http.post(baseURL + '/login/', JSON.stringify(user), this.httpOptions);
  }

  public logout(): void {
    this.token = null;
    this.token_expires = null;
    this.username = null;
    this.cookieService.delete('token');
    this.logged = false;
    this.permissions = {food: false, user: false};
  }

  updateData(token): void {
    this.token = token;
    this.cookieService.set('token', token);
    this.logged = true;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.token
      })
    };

    this.http.get(baseURL + '/getpermissions', httpOptions).subscribe(
      p => {this.permissions = p; this.logged = true; },
      error => {this.logged = false; this.permissions = {food: false, user: false}; }
    );
  }

}
