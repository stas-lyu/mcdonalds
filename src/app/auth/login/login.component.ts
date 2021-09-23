import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MyErrorStateMatcher, SignUpComponent} from "../sign-up/sign-up.component";
import {AuthService} from "../../core/services/auth.service";
import {User} from "../../shared/classes/user";
import {Router} from "@angular/router";

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

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.getUsers()
  }

  private getUsers(): void {
    this.authService.getUsers().subscribe((user: User[]) => this.users = user);
  }

  public onClickSubmit(): void {
    if (this.passwordFormControl.status === 'VALID' && this.emailFormControl.status === 'VALID') {
      this.formData = {
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value,
      }
      this.users.forEach((user) => {
        if (user.email === this.formData.email && user.password === this.formData.password) {
          this.authService.setCurrentUser(user.email);
          if (user.isAdmin) {
            this.router.navigate(['admin']);
          } else this.router.navigate(['categories']);
        } else this.authService.openSnackBar('Incorrect email or password', 'Do you wont sign in or try again')
      })
    }
  }

}
