import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../sign-up/sign-up.component";
import {AuthService} from "../../core/services/auth.service";
import {User} from "../../shared/classes/user";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  users!: User[];
  formData: any;
  id!: number;

  passwordFormControl = new FormControl('', [Validators.required, Validators.min(6)]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(public authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {
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

  public login(): void {
    if (this.passwordFormControl.status === 'VALID' && this.emailFormControl.status === 'VALID') {
      this.formData = {
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value,
      }
      this.authService.login(this.formData, this.users)
      if (!this.authService.isLoggedIn) {
        this.openSnackBar('incorect input field', 'Try again!')
      }
    }
  }
}
