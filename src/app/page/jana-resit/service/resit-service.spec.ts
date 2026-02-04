import { TestBed } from '@angular/core/testing';

import { ResitService } from './resit-service';

describe('ResitService', () => {
  let service: ResitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
