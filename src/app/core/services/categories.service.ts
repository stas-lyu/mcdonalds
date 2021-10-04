import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Category } from '../../shared/classes/category';
import { Dish } from '../../shared/classes/dish';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('No-Auth', 'True'),
  // responseType: 'text' as 'json',
};

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private url = environment.urlToBackend;

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/categories`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  public getDishesByCategoryId(id: number): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.url}/dishes/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  public addCategory(category: {}): any {
    return this.http
      .post<Category>(`${this.url}/categories`, category, httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public editCategory(category: Category): any {
    return this.http.patch<any>(
      `${this.url}/categories/${category.id}`,
      category,
      httpOptions
    );
  }

  public deleteCategory(categoryId: number): any {
    return this.http.delete(
      `${this.url}/categories/${categoryId}`,
      httpOptions
    );
  }

  public uploadCategoryImg(formData: any): any {
    return this.http.post<any>(
      'http://localhost:3000/upload',
      formData,
      httpOptions
    );
  }

  public addDish(dish: {}): any {
    return this.http
      .post<Category>(`${this.url}/dishes`, dish, httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public editDish(dish: Dish): any {
    return this.http.put<any>(
      `${this.url}/dishes/${dish.id}`,
      dish,
      httpOptions
    );
  }

  public deleteDish(categoryId: number, dishId: number): any {
    return this.http.delete(`${this.url}/dishes/${dishId}`, httpOptions);
  }
}
