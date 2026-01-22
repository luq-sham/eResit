import { TestBed } from '@angular/core/testing';

import { TabelService } from './tabel-service';

describe('TabelService', () => {
  let service: TabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
