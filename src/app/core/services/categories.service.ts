import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse, HttpHeaders,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {Category} from "../../shared/classes/category";
import {Dish} from "../../shared/classes/dish";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  private categoriesUrl = 'api/categories/';
  private dishesUrl = 'api/items/';

  constructor(private http: HttpClient) {
  }

  postId!: number;
  errorMessage!: string;

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

  public addCategory(category: {}): any {
    this.http.post<Category>(this.categoriesUrl, category, httpOptions);
    catchError((error: HttpErrorResponse) => {
      console.error(error);
      return throwError(error);
    })
  }

  public editCategory(category: {}, categoryId: number): any {

    this.http.put<any>(`${this.categoriesUrl + categoryId}`, category)
      .subscribe({
        next: data => {
          this.postId = data.id;
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
  }

  public deleteCategory(categoryId: number): any {
    this.http.delete(this.categoriesUrl + categoryId)
      .subscribe({
        next: data => {
          console.log('Delete successful');
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
  }
}
