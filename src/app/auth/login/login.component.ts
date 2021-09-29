import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/classes/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';

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
  notifier = new Subject();

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
      .pipe(takeUntil(this.notifier))
      .subscribe((response: any): void => {
        const responseData = JSON.parse(response);
        this.authService.setCurrentUser(
          this.dataForm.value.email,
          responseData.isAdmin
        );
        this.router.navigate(responseData.isAdmin ? ['admin'] : ['categories']);
      });
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
