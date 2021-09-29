import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Category } from '../../shared/classes/category';
import { Dish } from '../../shared/classes/dish';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
  responseType: 'text' as 'json',
};

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private url = environment.urlToBackend;
  private categoriesUrl = `${this.url}/categories`;
  private dishesUrl = `${this.url}/dishes`;

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl).pipe(
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
    this.http.post<Category>(this.categoriesUrl, category, httpOptions);
    catchError((error: HttpErrorResponse) => {
      console.error(error);
      return throwError(error);
    });
  }

  public editCategory(category: Category): any {
    return this.http.patch<any>(
      `${this.categoriesUrl}/${category.id}`,
      category,
      httpOptions
    );
  }

  public deleteCategory(categoryId: number): any {
    return this.http.delete(this.categoriesUrl + categoryId, httpOptions);
  }

  public deleteDish(categoryId: number, dishId: number): any {
    return this.http.delete(this.dishesUrl + dishId, httpOptions);
  }
}
