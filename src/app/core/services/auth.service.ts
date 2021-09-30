import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../shared/classes/user';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { filter } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
  responseType: 'text' as 'json',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.urlToBackend;
  private authSubject = new BehaviorSubject(false);
  private admin: boolean = JSON.parse(<string>localStorage.getItem('isAdmin'));

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated()
      .pipe(filter((res) => res))
      .subscribe((res) => {
        this.router.navigate(['categories']);
      });
  }

  public setCurrentUser(email: string, isAdmin: boolean): void {
    localStorage.setItem('user', email);
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    this.authSubject.next(true);
    this.admin = isAdmin;
  }

  public getCurrentUser(): string | any {
    return localStorage.getItem('user') || undefined;
  }

  public logout() {
    localStorage.removeItem('user');
    localStorage.setItem('isAdmin', JSON.stringify(false));
    this.admin = false;
    this.authSubject.next(false);
  }

  public get isAdmin(): boolean {
    return this.admin;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  public addUser(user: User): any {
    return this.http.post<User>(`${this.url}/register`, user, httpOptions);
  }

  public singIn(user: User): any {
    return this.http.post(`${this.url}/login`, user, httpOptions);
  }

  public isAuthenticated() {
    return this.authSubject.asObservable();
  }
}
