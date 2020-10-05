import { TestBed } from '@angular/core/testing';

import { StationStatusService } from './station-status.service';

describe('StationStatusService', () => {
  let service: StationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
