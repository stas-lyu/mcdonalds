import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  categories: Object = [];

  constructor(_http: HttpClient) {
    _http.get('api/categories')
      .pipe(map((item) => {
        let array: any[] = []
        Object.values(item)[0].forEach((t: any) => {
          array.push(t.category)
        })
        return array
      }))
      .subscribe(results => {
        this.categories = results
      })
  }

  ngOnInit(): void {

  }

}
