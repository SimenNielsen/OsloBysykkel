import { TestBed } from '@angular/core/testing';

import { StationInformationService } from './station-information.service';

describe('StationInformationService', () => {
  let service: StationInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
