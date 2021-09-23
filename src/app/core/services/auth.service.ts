import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";

import {User} from '../../shared/classes/user';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = 'api/users';
  public loggedIn = false;

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) {
    this.loggedIn = !!localStorage.getItem('user');
  }

  public setCurrentUser(email: string): void {
    localStorage.setItem('user', email);
    this.loggedIn = true;
  }

  getCurrentUser(): string | any {
    return localStorage.getItem('user') || undefined;
  }

  public get logout() {
    localStorage.removeItem('user');
    return this.loggedIn = false;
  }

  public get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(heroes => this.log(`fetched users`)),
        catchError(this.handleError('getUsers', []))
      );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000}).onAction()
      .subscribe(() => this.router.navigate(['sign-in']));
  }

  addUser(user: User, users: any): Observable<User> {
    let userObservable: any;
    users.forEach((person: any) => {
      if (person.email === user.email) {
        return this.openSnackBar('This email already registered', 'Do you wont sign in?')
      } else {
        if (users.length === 0) {
          user.id = 11;
          userObservable = this.http.put(this.usersUrl, user, httpOptions)
        } else {
          userObservable = this.http.post<User>(this.usersUrl, user, httpOptions);
        }
        this.router.navigate(['categories']);
        this.setCurrentUser(user.email);
        return userObservable
      }
    })
    return userObservable
  }

  genId(user: User[]): number {
    return user.length > 0 ? Math.max(...user.map(person => person.id)) + 1 : 11;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message)
  }
}
