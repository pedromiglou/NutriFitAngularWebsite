import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-bmiresults',
  templateUrl: './bmiresults.component.html',
  styleUrls: ['./bmiresults.component.css']
})
export class BMIresultsComponent implements OnInit {
  public bmi: number;

  constructor(private cookieService: CookieService){ }

  ngOnInit(): void {
    this.bmi = parseFloat(this.cookieService.get('bmi'));
  }

}
