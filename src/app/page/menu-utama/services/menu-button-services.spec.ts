import { TestBed } from '@angular/core/testing';

import { MenuButtonServices } from './menu-button-services';

describe('MenuButtonServices', () => {
  let service: MenuButtonServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuButtonServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
