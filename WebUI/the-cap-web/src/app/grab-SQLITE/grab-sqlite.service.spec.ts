import { TestBed } from '@angular/core/testing';

import { GrabSQLITEService } from './grab-sqlite.service';

describe('GrabSQLITEService', () => {
  let service: GrabSQLITEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrabSQLITEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
