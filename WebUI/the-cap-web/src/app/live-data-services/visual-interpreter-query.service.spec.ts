import { TestBed } from '@angular/core/testing';

import { VisualInterpreterQueryService } from './visual-interpreter-query.service';

describe('VisualInterpreterQueryService', () => {
  let service: VisualInterpreterQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualInterpreterQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
