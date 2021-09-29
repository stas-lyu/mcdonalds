import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/classes/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  users!: User[];
  id!: number;
  dataForm: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.dataForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
    });
  }

  private getUsers(): void {
    this.authService
      .getUsers()
      .subscribe((user: User[]) => (this.users = user));
  }

  public openSnackBar(message: string, action: string): void {
    this._snackBar
      .open(message, action, { duration: 3000 })
      .onAction()
      .subscribe(() => this.router.navigate(['sign-in']));
  }

  public login() {
    this.authService
      .singIn(this.dataForm.value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.openSnackBar(
            'invalid email or password',
            'Did you wont sign in or try again'
          );
          return throwError(error);
        })
      )
      .subscribe((): void => {
        this.authService.getUsers().subscribe((users) => {
          users.forEach((user) => {
            if (user.email === this.dataForm.value.email) {
              this.authService.setCurrentUser(
                this.dataForm.value.email,
                user.isAdmin
              );
              this.router.navigate(user.isAdmin ? ['admin'] : ['categories']);
            }
          });
        });
      });
  }
}
