import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {User} from '../../shared/classes/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private usersUrl = 'api/users';

  constructor(private http: HttpClient) {

  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
      tap((user: User) => console.log(`added user w/ id=${user.id}`)),
    );
  }
}
