import { TestBed } from '@angular/core/testing';
import { Matching } from './matching';

describe('Matching', () => {
  let service: Matching;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Matching);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
