import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {Category} from "../../shared/classes/category";
import {Dish} from "../../shared/classes/dish";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoriesUrl = 'api/categories/';
  private dishesUrl = 'api/items/';

  constructor(private http: HttpClient) {
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  public getDishesByCategoryId(id: any): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.dishesUrl)
      .pipe(map((item: any) => {
        if (item[id].categoryId == id) {
          return item[id].products;
        }
      }), catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      }))
  }
}
