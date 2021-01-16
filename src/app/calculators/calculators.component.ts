import { Component, OnInit } from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {CalculateService} from "../calculate.service";
import {AuthServiceService} from "../auth-service.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-calculators',
  templateUrl: './calculators.component.html',
  styleUrls: ['./calculators.component.css']
})

export class CalculatorsComponent implements OnInit {
  formCalculatorBMI: FormGroup;
  formCalculatorCI: FormGroup;
  public imc: number;
  public bmr: number;
  public caloric_intake: number;
  constructor(private calculatorService: CalculateService, public authService: AuthServiceService, private router: Router,
              private cookieService: CookieService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.initForm();

    if (this.authService.logged) {
      this.profileService.getGoals().subscribe(
        data => {
          this.formCalculatorBMI.setValue({altura: data.altura, peso: data.altura, idade: data.idade, save: ''});
          this.formCalculatorCI.setValue({
            altura: data.altura,
            peso: data.peso,
            idade: data.idade,
            sexo: data.sexo,
            atividade: data.atividade,
            save: ''
          });
        });
    }
  }

  initForm(): void{
    this.formCalculatorBMI = new FormGroup({
      altura: new FormControl('', [Validators.required]),
      peso: new FormControl('', [Validators.required]),
      idade: new FormControl('', [Validators.required]),
      save: new FormControl(''),
    });

    this.formCalculatorCI = new FormGroup({
      altura: new FormControl('', [Validators.required]),
      peso: new FormControl('', [Validators.required]),
      idade: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      atividade: new FormControl('', [Validators.required]),
      save: new FormControl(''),
    });
  }

  calculateBMI(): void{
    if (this.formCalculatorBMI.valid){
      const altura = this.formCalculatorBMI.value.altura / 100;
      this.imc = this.formCalculatorBMI.value.peso / (altura * altura);
      this.cookieService.set('bmi', this.imc.toFixed(2));
      if (this.formCalculatorBMI.value.save){
        this.updateBMI();
      }
      this.router.navigateByUrl('BMIresults');
    } else{
      alert('Form is invalid!');
    }
  }

  calculateCI(): void{
    if (this.formCalculatorCI.valid){
      this.bmr = 0;
      if (this.formCalculatorCI.value.sexo === 'Male'){
        this.bmr = 66.4730 + (13.7516 * this.formCalculatorCI.value.peso) + (5.0033 * this.formCalculatorCI.value.altura) -
          (6.7550 * this.formCalculatorCI.value.idade);
      }
      else if (this.formCalculatorCI.value.sexo === 'Female'){
        this.bmr = 655.0955 + (9.5634 * this.formCalculatorCI.value.peso) + (1.8496 * this.formCalculatorCI.value.altura) -
          (4.6756 * this.formCalculatorCI.value.idade);
      }
      this.caloric_intake = 0;
      if (this.formCalculatorCI.value.atividade === 'none'){
        this.caloric_intake = this.bmr * 1.2;
      }
      else if (this.formCalculatorCI.value.atividade === 'light'){
        this.caloric_intake = this.bmr * 1.375;
      }
      else if (this.formCalculatorCI.value.atividade === 'moderate'){
        this.caloric_intake = this.bmr * 1.55;
      }
      else if (this.formCalculatorCI.value.atividade === 'heavy'){
        this.caloric_intake = this.bmr * 1.725;
      }
      else if (this.formCalculatorCI.value.atividade === 'very_heavy'){
        this.caloric_intake = this.bmr * 1.9;
      }

      let ci_lone = this.caloric_intake - 1000;
      let ci_lhalf = this.caloric_intake - 500;
      let ci_mone = this.caloric_intake + 1000;
      let ci_mhalf = this.caloric_intake + 500;

      this.cookieService.set('bmr', this.bmr.toString());
      this.cookieService.set('caloric_intake', this.caloric_intake.toString());
      this.cookieService.set('ci_lone', ci_lone.toString());
      this.cookieService.set('ci_lhalf', ci_lhalf.toString());
      this.cookieService.set('ci_mone', ci_mone.toString());
      this.cookieService.set('ci_mhalf', ci_mhalf.toString());
      if (this.formCalculatorCI.value.save){
        this.updateCI();
      }
      this.router.navigateByUrl('CIresults');
    } else{
      console.log(this.formCalculatorCI.value.height.valid);
      alert('Form is invalid!');
    }
  }

  updateBMI(): void{
    if (this.formCalculatorBMI.valid){
      this.calculatorService.updateBMI(this.formCalculatorBMI.value).subscribe(x => {},
        error => this.router.navigateByUrl('login')
      );
    }
  }

  updateCI(): void {
    if (this.formCalculatorCI.valid) {
      this.calculatorService.updateCI(this.formCalculatorCI.value).subscribe(x => {},
        error => this.router.navigateByUrl('login')
      );
    }
  }
}
