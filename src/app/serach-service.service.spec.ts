import { TestBed } from '@angular/core/testing';

import { SearchService } from './core/services/search.service';

describe('SerachServiceService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
