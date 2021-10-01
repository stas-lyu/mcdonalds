import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Category } from '../../shared/classes/category';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('No-Auth', 'True'),
};

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private url = environment.urlToBackend;

  constructor(private http: HttpClient) {}

  public postOrder(order: {}): any {
    return this.http
      .post<Category>(`${this.url}/orders`, order, httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
