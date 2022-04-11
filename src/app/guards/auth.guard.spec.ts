import { TestBed } from '@angular/core/testing';
import { AuthorizeGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthorizeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
