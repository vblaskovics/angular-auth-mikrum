import { TestBed } from '@angular/core/testing';

import { MoreGuardService } from './more-guard.service';

describe('MoreGuardService', () => {
  let service: MoreGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoreGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
