import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthService} from "../../core/services/auth.service";
import {User} from "../../shared/classes/user";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  users!: User[];
  hide = true;
  formData: any;
  id!: number;
  passwordFormControl = new FormControl('', [Validators.required, Validators.min(6)]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  checkboxFormControl = new FormControl(false)

  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getUsers()
  }

  private getUsers(): void {
    this.authService.getUsers().subscribe((user: User[]) => this.users = user);
  }

  public openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {duration: 3000}).onAction()
      .subscribe(() => this.router.navigate(['sign-in']));
  }

  public onClickSubmit(): void {
    if (this.passwordFormControl.status === 'VALID' && this.emailFormControl.status === 'VALID') {
      this.formData = {
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value,
        isAdmin: this.checkboxFormControl.value
      }
      localStorage.setItem('role', JSON.stringify(this.checkboxFormControl.value ? 'admin' : 'customer'))
      this.authService.addUser(this.formData, this.users)
      setTimeout(()=>{
        if (!this.authService.isLoggedIn) {
          this.openSnackBar('this email already registered', 'Do you wont sign in or try again')
        }
      },1000)
    }
  }
}


