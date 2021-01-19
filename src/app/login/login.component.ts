import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServiceService} from '../auth-service.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  constructor(private authService: AuthServiceService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.authService.logout();
  }
  initForm(): void{
    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  loginProcess(): void{
    if (this.formLogin.valid){
      this.authService.login(this.formLogin.value).subscribe(
        data => {
          this.authService.updateData(data.token);
          this.router.navigateByUrl('daily');
        },
        err => {
          this.authService.errors = err.error;
        }
      );
    }
  }
}
