import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {SignUpService} from "../../core/services/sign-up.service";
import {User} from "../../shared/classes/user";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  users: User[] | any;
  formData: any;
  id: number | undefined;
  nameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  checkboxFormControl = new FormControl(false)

  matcher = new MyErrorStateMatcher();

  constructor(private userService: SignUpService) {
  }

  ngOnInit(): void {

  }

  onClickSubmit(): void {
    if (this.nameFormControl.status === 'VALID') {
      if (this.emailFormControl.status === 'VALID') {
        this.formData = {
          id: 1,
          name: this.nameFormControl.value,
          email: this.emailFormControl.value,
          isAdmin: this.checkboxFormControl.value
        }

        this.userService.addUser(this.formData)
          .subscribe(
            (data: any) => {
              this.users.push(data);
            },
            (error: any) => console.log(error)
          );
      }
    }
  }
}


