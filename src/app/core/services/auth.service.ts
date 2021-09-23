import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {catchError, retry, tap} from "rxjs/operators";

import {User} from '../../shared/classes/user';
import {Router} from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = 'api/users';
  public loggedIn = false;
  users:any [] = [];

  constructor(private http: HttpClient, private router: Router) {
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

  public addUser(user: User, users: User[]): any {
    if (users.some((person: User) => person.email === user.email)) {
      throwError('This email already registered');
    } else  {
      this.http.post<User>(this.usersUrl, user, httpOptions).subscribe((user: User) => {
        this.setCurrentUser(user.email);
        this.router.navigate(user.isAdmin ? ['admin'] : ['categories']);
      }, catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      }))
    }
  }

  public genId(user: User[]): number {
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
