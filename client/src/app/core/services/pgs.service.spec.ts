import { TestBed } from '@angular/core/testing';

import { PgsService } from './pgs.service';

describe('PgsService', () => {
  let service: PgsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
