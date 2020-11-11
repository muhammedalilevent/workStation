import { TestBed } from '@angular/core/testing';

import { GetTimeService } from './get-time.service';

describe('GetTimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetTimeService = TestBed.get(GetTimeService);
    expect(service).toBeTruthy();
  });
});
