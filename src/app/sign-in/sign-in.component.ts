import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../register.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  formRegister: FormGroup;
  constructor(private registService: RegisterService, private router: Router) { }
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void{
    this.formRegister = new FormGroup({
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      c_password: new FormControl('', [Validators.required]),
      altura: new FormControl('', [Validators.required]),
      peso: new FormControl('', [Validators.required]),
      idade: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      objetivo: new FormControl('', [Validators.required]),
      atividade: new FormControl('', [Validators.required]),
    });
  }

  registProcess(): void{
    if (this.formRegister.valid){
      if (this.validatePassword(this.formRegister.value.password)) {
        if (this.formRegister.value.password === this.formRegister.value.c_password) {
          this.registService.register(this.formRegister.value).subscribe(result => {
            this.router.navigateByUrl('login');
          }, () => alert('invalid field or username already exists'));
        } else{
          alert('Passwords are different');
        }
      }
    }
  }

  validatePassword(password): boolean{
    let errors = [];
    if (password.length < 8) {
      errors.push("Your password must be at least 8 characters");
    }
    if (password.search(/[a-z]/i) < 0) {
      errors.push("Your password must contain at least one letter.");
    }
    if (password.search(/[0-9]/) < 0) {
      errors.push("Your password must contain at least one digit.");
    }
    if (errors.length > 0) {
      alert(errors.join('\n'));
      for (let e in errors){
        alert(e);
      }
      return false;
    }
    return true;
  }
}
