import {Injectable} from '@angular/core';
import {Product} from './category.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private productsUrl = 'api/categories/';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  createProduct(product: { name: string; id: null }): Observable<Product> {

    return this.http.post<Product>(this.productsUrl, product).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  editProduct(product: Product): Observable<any> {
    return this.http.put(this.productsUrl + product.id, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.productsUrl + id);
  }
}
