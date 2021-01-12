import { TestBed } from '@angular/core/testing';

import { Decode64Service } from './decode64.service';

describe('Decode64Service', () => {
  let service: Decode64Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Decode64Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
