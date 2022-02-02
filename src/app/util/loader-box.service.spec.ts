import { TestBed } from '@angular/core/testing';

import { LoaderBoxService } from './loader-box.service';

describe('LoaderBoxService', () => {
  let service: LoaderBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
