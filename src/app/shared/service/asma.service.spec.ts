import { TestBed } from '@angular/core/testing';

import { AsmaService } from './asma.service';

describe('AsmaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsmaService = TestBed.get(AsmaService);
    expect(service).toBeTruthy();
  });
});
