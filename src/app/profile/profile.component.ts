import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../profile.service';
import {AuthServiceService} from '../auth-service.service';
import {Router} from '@angular/router';
import {User} from '../../User';
import {Profile} from '../../Profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private pro: HTMLElement;
  private pwd: HTMLElement;
  private obj: HTMLElement;
  private a_pro: HTMLElement;
  private a_pwd: HTMLElement;
  private a_obj: HTMLElement;
  formPI: FormGroup;
  formPWD: FormGroup;
  formG: FormGroup;
  private user: User;
  private profile: Profile;
  constructor(private cookieService: CookieService, private profileService: ProfileService, private authService: AuthServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.refreshUser();
    this.pro = document.getElementById('pro');
    this.pwd = document.getElementById('pwd');
    this.obj = document.getElementById('obj');
    this.a_pro = document.getElementById('a_pro');
    this.a_pwd = document.getElementById('a_pwd');
    this.a_obj = document.getElementById('a_obj');
  }

  refreshUser(): void {
    this.profileService.getUser().subscribe(u => {
      this.user = u;
      this.formPI.setValue({first_name: u.firstName, last_name: u.lastName, username: u.username, email: u.email, gender: u.gender});
      }, error => this.router.navigateByUrl('login'));
  }

  refreshProfile(): void {
    this.profileService.getGoals().subscribe(p => {
      this.profile = p;
      this.formG.setValue({peso: p.peso, altura: p.altura, idade: p.idade, objetivo: p.objetivo, imc: p.imc,
                                ci: p.ci, atividade: p.atividade});
    }, error => this.router.navigateByUrl('login'));
  }

  initForm(): void{
    this.formPI = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])
    });

    this.formPWD = new FormGroup({
      old_pwd: new FormControl('', [Validators.required]),
      new_pwd: new FormControl('', [Validators.required]),
      new_pwd_c: new FormControl('', [Validators.required]),
    });

    this.formG = new FormGroup({
      objetivo: new FormControl('', [Validators.required]),
      atividade: new FormControl('', [Validators.required]),
      peso: new FormControl('', [Validators.required]),
      altura: new FormControl('', [Validators.required]),
      idade: new FormControl('', [Validators.required]),
      imc: new FormControl('', [Validators.required]),
      ci: new FormControl('', [Validators.required]),
    });
  }

  profile_pro(): void{
    this.refreshUser();
    this.pro.style.display = 'block';
    this.pwd.style.display = 'none';
    this.obj.style.display = 'none';
    this.a_pro.classList.remove('tab');
    this.a_pro.classList.add('active');
    this.a_pwd.classList.remove('active');
    this.a_pwd.classList.add('tab');
    this.a_obj.classList.remove('active');
    this.a_obj.classList.add('tab');
  }

  profile_pwd(): void{
    this.pro.style.display = 'none';
    this.pwd.style.display = 'block';
    this.obj.style.display = 'none';
    this.a_pro.classList.remove('active');
    this.a_pro.classList.add('tab');
    this.a_pwd.classList.remove('tab');
    this.a_pwd.classList.add('active');
    this.a_obj.classList.remove('active');
    this.a_obj.classList.add('tab');
  }

  profile_obj(): void{
    this.refreshProfile();
    this.pro.style.display = 'none';
    this.pwd.style.display = 'none';
    this.obj.style.display = 'block';
    this.a_pro.classList.remove('active');
    this.a_pro.classList.add('tab');
    this.a_pwd.classList.remove('active');
    this.a_pwd.classList.add('tab');
    this.a_obj.classList.remove('tab');
    this.a_obj.classList.add('active');
  }

  logout(): void {
    this.authService.logout();
  }

  setUser(): void{
    if (this.formPI.valid){
      this.profileService.setUser(this.formPI.value).subscribe(x => {
        this.refreshUser();
        document.getElementById('alerta_u_u').style.display = 'block';
        },
        error => this.router.navigateByUrl('login')
      );
    } else {
      alert('Please fill all required fields');
    }
  }

  setGoals(): void{
    if (this.formG.valid){
      this.profileService.setGoals(this.formG.value).subscribe(x => {
        this.refreshProfile();
        document.getElementById('alerta_u_g').style.display = 'block';
        },
        error => this.router.navigateByUrl('login')
      );
    } else {
      alert('Please fill all required fields');
    }
  }

  changePassword(): void{
    if (this.formPWD.valid){
      if (this.validatePassword(this.formPWD.value.new_pwd)) {
        if (this.formPWD.value.new_pwd === this.formPWD.value.new_pwd_c) {
          this.profileService.changePassword(this.formPWD.value).subscribe(result => {
            // this.router.navigateByUrl('login');
            document.getElementById('alerta_u_p').style.display = 'block';
          }, err => {
            if (err.status === 400){
              alert('Current password incorrect');
            }
          });
        } else{
          alert('Passwords are different');
        }
      }
    } else {
      alert('Please fill all required fields');
    }
  }

  validatePassword(password): boolean{
    const errors = [];
    if (password.length < 8) {
      errors.push('Your password must be at least 8 characters');
    }
    if (password.search(/[a-z]/i) < 0) {
      errors.push('Your password must contain at least one letter.');
    }
    if (password.search(/[0-9]/) < 0) {
      errors.push('Your password must contain at least one digit.');
    }
    if (errors.length > 0) {
      alert(errors.join('\n'));
      for (const e in errors){
        alert(e);
      }
      return false;
    }
    return true;
  }

  removeAlert(name: string): void{
    if (name === 'alerta_u_u'){
      document.getElementById('alerta_u_u').style.display = 'none';
    } else if (name === 'alerta_u_g') {
      document.getElementById('alerta_u_g').style.display = 'none';
    } else if (name === 'alerta_u_p') {
      document.getElementById('alerta_u_p').style.display = 'none';
    }
  }
}
