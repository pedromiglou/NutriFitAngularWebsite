import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from './auth-service.service';
import {Router} from 'express';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NutriFit';

  constructor(public authService: AuthServiceService, public router: Router) { }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
  }

  toogleList(): void {
    const x = document.getElementById('navbarResponsive');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }
}
