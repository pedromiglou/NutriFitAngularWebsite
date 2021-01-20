import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthServiceService} from '../auth-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  userForm: FormGroup;
  users: any[];
  public nome_user: string;
  private staff = '';
  private superUser = '';
  private name = '';
  public num_pages: number;
  public currentPage = 1;
  constructor(private authService: AuthServiceService, private router: Router, private route: ActivatedRoute,
              private cookieService: CookieService, private userService: UserService) { }

  ngOnInit(): void {
    this.init_Form();
    this.getUsers();
  }

  init_Form(): void{
    this.userForm = new FormGroup({
      name: new FormControl(''),
      staff: new FormControl(''),
      superuser: new FormControl(''),
    });
  }

  getUsers(): void{
    if (this.userForm.valid){
      this.name = this.userForm.value.name;
      this.staff = this.userForm.value.staff;
      this.superUser = this.userForm.value.superuser;
      this.currentPage = 1;
      this.userService.getUsers(this.userForm.value.name, this.userForm.value.staff, this.userForm.value.superuser,
        this.currentPage, null).subscribe(
        data => {this.users = data.users; this.num_pages = data.pages; },
        error => this.router.navigateByUrl('login')
      );
    } else{
      alert('Form is invalid!');
    }
  }

  promoteUser(user_id: string, user_name: string): void{
    this.userService.promoteUser({id: user_id}).subscribe(data => {
      this.users = data;
      this.getUsers();
      this.nome_user = user_name;
      document.getElementById('alerta_promote').style.display = 'block';
      },
      error => this.router.navigateByUrl('login')
    );
  }

  demoteUser(user_id: string, user_name: string): void{
    this.userService.downgradeUser({id: user_id}).subscribe(data => {
      this.users = data;
      this.getUsers();
      this.nome_user = user_name;
      document.getElementById('alerta_demote').style.display = 'block';
      },
      error => this.router.navigateByUrl('login')
    );
  }

  removeAlert(name: string): void{
    if (name === 'alerta_promote'){
      document.getElementById('alerta_promote').style.display = 'none';
    } else if (name === 'alerta_demote') {
      document.getElementById('alerta_demote').style.display = 'none';
    }
  }

  pageUp(): void{
    this.currentPage += 1;
    this.userService.getUsers(this.userForm.value.name, this.userForm.value.staff, this.userForm.value.superuser, this.currentPage, null).subscribe(
      data => {this.users = data.users; this.num_pages = data.pages; },
      error => this.router.navigateByUrl('login')
    );
  }

  pageDown(): void{
    this.currentPage -= 1;
    this.userService.getUsers(this.userForm.value.name, this.userForm.value.staff, this.userForm.value.superuser, this.currentPage, null).subscribe(
      data => {this.users = data.users; this.num_pages = data.pages; },
      error => this.router.navigateByUrl('login')
    );
  }
}
