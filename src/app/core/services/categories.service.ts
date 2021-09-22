import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {Category} from "../../shared/classes/category";
import {SingleCategory} from "../../shared/classes/singleCategory";
import {Dish} from "../../shared/classes/dish";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements HttpInterceptor {
  private categoriesUrl = 'api/categories/';
  private dishesUrl = 'api/items/';

  constructor(private http: HttpClient) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  getDishesByCategoryId(id: any): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.dishesUrl)
      .pipe(map((item: any) => {
        if (item[id].categoryId == id) {
          return item[id].info
        }
      }), catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      }))
    //   .pipe(
    //   retry(2),
    //   catchError((error: HttpErrorResponse) => {
    //     console.error(error);
    //     return throwError(error);
    //   })
    // );
  }

  // getCategories(): Observable<Category[]> {
  //   return this.http.get<Category[]>(this.categoriesUrl)
  // }
  //
  // createProduct(product: { name: string; id: null }): Observable<Product> {
  //
  //   return this.http.post<Product>(this.productsUrl, product).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error(error);
  //       return throwError(error);
  //     })
  //   )
  // }
  //
  // editProduct(product: Product): Observable<any> {
  //   return this.http.put(this.productsUrl + product.id, product);
  // }
  //
  // deleteProduct(id: number): Observable<any> {
  //   return this.http.delete(this.productsUrl + id);
  // }
}
