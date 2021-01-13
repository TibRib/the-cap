import { TestBed } from '@angular/core/testing';

import { GCS_StorageService } from './gcs-storage.service';

describe('GCS_StorageService', () => {
  let service: GCS_StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GCS_StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
