import { TestBed, inject } from '@angular/core/testing';

import { TicketStateService } from './ticket-state.service';

describe('TicketStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketStateService]
    });
  });

  it('should be created', inject([TicketStateService], (service: TicketStateService) => {
    expect(service).toBeTruthy();
  }));
});
