import { TestBed } from '@angular/core/testing';

import { ObjectObserverQueryService } from './object-observer-query.service';

describe('ObjectObserverQueryService', () => {
  let service: ObjectObserverQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectObserverQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
