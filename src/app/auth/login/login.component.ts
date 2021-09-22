import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../sign-up/sign-up.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  passwordFormControl = new FormControl('', [Validators.required, Validators.min(6)]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor() { }

  ngOnInit(): void {
  }

  onClickSubmit() {

  }

}
