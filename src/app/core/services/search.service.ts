import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  map,
  debounceTime,
  switchMap,
  distinctUntilChanged,
} from 'rxjs/operators';

@Injectable()
export class SearchService {
  baseUrl = environment.urlToBackend;
  queryUrl: string = '?search=';

  constructor(private http: HttpClient) {}

  search(terms: Observable<any>) {
    return terms;
    debounceTime(400);
    distinctUntilChanged();
    switchMap((term: any) => this.searchEntries(term));
  }

  searchEntries(term: string) {
    return this.http.get(this.baseUrl + this.queryUrl + term);
    map((res: { json: () => any }) => res.json());
  }
}
