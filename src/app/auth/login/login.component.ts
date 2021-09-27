import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
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
  id!: number;
  dataForm: any;

  passwordFormControl = new FormControl('', [Validators.required, Validators.min(6)]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(public authService: AuthService, private router: Router, private _snackBar: MatSnackBar , private formBuilder: FormBuilder) {
    this.dataForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
    })
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
    if (this.dataForm.valid) {
      this.authService.login(this.dataForm.value)
      if (!this.authService.isLoggedIn) {
        this.openSnackBar('incorect input field', 'Try again!')
      }
    }
  }
}
