import { TestBed } from '@angular/core/testing';

import { SecureApiService } from './secure-api.service';

describe('SecureApiService', () => {
  let service: SecureApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecureApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
