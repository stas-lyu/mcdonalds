import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from '../../shared/classes/user';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
  responseType: 'text' as 'json',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.urlToBackend;
  private usersUrl = `${this.url}/users`;
  private loggedIn = false;
  users: any[] = [];
  roleAs!: string[];
  private admin!: boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.loggedIn = !!localStorage.getItem('user');
    this.getUsers().subscribe((user: User[]) => (this.users = user));
  }

  public setCurrentUser(email: string, isAdmin: boolean): void {
    localStorage.setItem('user', email);
    this.loggedIn = true;
    this.admin = isAdmin;
  }

  public getCurrentUser(): string | any {
    return localStorage.getItem('user') || undefined;
  }

  public logout() {
    localStorage.removeItem('user');
    this.loggedIn = false;
    this.admin = false;
  }

  public get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public get isAdmin(): boolean {
    return this.admin;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap((users) => this.log(`fetched users`)),
      catchError(this.handleError('getUsers', []))
    );
  }

  public login(user: User): any {
    if (
      this.users.some((person: User) => {
        localStorage.setItem('role', person.isAdmin ? 'admin' : 'customer');
        return (
          person.email === user.email &&
          person.password.toString() === user.password.toString()
        );
      })
    ) {
      this.setCurrentUser(user.email, true);
      return this.router.navigate(this.isAdmin ? ['admin'] : ['categories']);
    } else {
      return throwError('This email already registered');
    }
  }

  public addUser(user: User): any {
    if (this.users.some((person: User) => person.email === user.email)) {
      return throwError('This email already registered');
    } else {
      return this.http.post<User>(this.usersUrl, user, httpOptions);
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
