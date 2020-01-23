import { TestBed, inject } from '@angular/core/testing';

import { SearchParamsStateService } from './search-params-state.service';

describe('SearchParamsStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchParamsStateService]
    });
  });

  it('should be created', inject([SearchParamsStateService], (service: SearchParamsStateService) => {
    expect(service).toBeTruthy();
  }));
});
