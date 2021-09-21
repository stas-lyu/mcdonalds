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
import {catchError, retry} from 'rxjs/operators';
import {Category} from "../../shared/classes/category";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements HttpInterceptor{
  private categoriesUrl = 'api/categories/';

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
