import { TestBed, inject } from '@angular/core/testing';

import { CommentStateService } from './comment-state.service';

describe('CommentStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentStateService]
    });
  });

  it('should be created', inject([CommentStateService], (service: CommentStateService) => {
    expect(service).toBeTruthy();
  }));
});
