import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService],
})
export class SearchComponent implements OnInit {
  results!: Object;
  searchTerm$ = new Subject<string>();

  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchTerm$).subscribe((results) => {
      this.results = results.results;
    });
  }

  ngOnInit(): void {}
}
