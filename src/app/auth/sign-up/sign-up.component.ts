import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/classes/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, filter, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import * as AuthActions from '../store/actions/auth.actions';
import { IUserState } from '../store/state/auth.state';
import { Store } from '@ngrx/store';
import { selectedAuth } from '../store/selectors/auth.selectors';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  users!: User[];
  notifier = new Subject();
  hide = true;
  dataForm!: FormGroup;
  id!: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private store: Store<IUserState>
  ) {}

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
      this.store.dispatch(
        new AuthActions.RegistrationAuth(this.dataForm.value)
      );
      this.store
        .select(selectedAuth)
        .pipe(
          filter((response) => !!response),
          catchError((error: HttpErrorResponse) => {
            this.openSnackBar(
              'this email already registered',
              'Do you wont sign in or try again'
            );
            return throwError(error);
          }),
          takeUntil(this.notifier)
        )
        .subscribe((response: any) => {
          const { id, isAdmin } = response;
          this.authService.setCurrentUser(id, isAdmin);
          this.router.navigate(isAdmin ? ['admin'] : ['categories']);
        });
    }
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
