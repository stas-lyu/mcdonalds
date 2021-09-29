import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/classes/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  users!: User[];
  hide = true;
  dataForm: any;
  id!: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
      isAdmin: [false],
    });
  }

  public openSnackBar(message: string, action: string): void {
    this._snackBar
      .open(message, action, { duration: 3000 })
      .onAction()
      .subscribe(() => this.router.navigate(['sign-in']));
  }

  public onClickSubmit(): void {
    if (this.dataForm.valid) {
      this.authService
        .addUser(this.dataForm.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.openSnackBar(
              'this email already registered',
              'Do you wont sign in or try again'
            );
            return throwError(error);
          })
        )
        .subscribe((user: User) => {
          this.authService.setCurrentUser(
            this.dataForm.value.email,
            this.dataForm.value.isAdmin
          );
          this.router.navigate(
            this.dataForm.value.isAdmin ? ['admin'] : ['categories']
          );
        });
    }
  }
}
