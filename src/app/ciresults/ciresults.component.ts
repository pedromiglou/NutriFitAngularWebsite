import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-ciresults',
  templateUrl: './ciresults.component.html',
  styleUrls: ['./ciresults.component.css']
})
export class CIresultsComponent implements OnInit {
  public bmr: number;
  public caloric_intake: number;
  public ci_lhalf: number;
  public ci_lone: number;
  public ci_mhalf: number;
  public ci_mone: number;
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.bmr = parseFloat(parseFloat(this.cookieService.get('bmr')).toFixed());
    this.caloric_intake = parseFloat(parseFloat(this.cookieService.get('caloric_intake')).toFixed());
    this.ci_lhalf = parseFloat(parseFloat(this.cookieService.get('ci_lhalf')).toFixed());
    this.ci_lone = parseFloat(parseFloat(this.cookieService.get('ci_lone')).toFixed());
    this.ci_mhalf = parseFloat(parseFloat(this.cookieService.get('ci_mhalf')).toFixed());
    this.ci_mone = parseFloat(parseFloat(this.cookieService.get('ci_mone')).toFixed());
  }
}
