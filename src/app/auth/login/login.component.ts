import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/classes/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import * as AuthActions from '../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { IUserState } from '../store/state/auth.state';
import { selectedAuth } from '../store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  storeSub!: Subscription;
  hide = true;
  id!: number;
  loginForm!: FormGroup;
  notifier = new Subject();

  constructor(
    private store: Store<IUserState>,
    private router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public openSnackBar(message: string, action: string): void {
    this._snackBar
      .open(message, action, { duration: 3000 })
      .onAction()
      .pipe(takeUntil(this.notifier))
      .subscribe(() => this.router.navigate(['sign-in']));
  }

  public login(): void {
    this.store.dispatch(new AuthActions.LoginAuth(this.loginForm.value));
    this.storeSub = this.store
      .select(selectedAuth)
      .pipe(
        filter((response) => !!response),
        takeUntil(this.notifier)
      )
      .subscribe((response: User) => {
        this.authService.setCurrentUser(response.id, response.isAdmin);
        this.router.navigate(response.isAdmin ? ['admin'] : ['categories']);
      });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
