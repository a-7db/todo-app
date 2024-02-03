import { TestBed } from '@angular/core/testing';

import { AddToDoService } from './add-to-do.service';

describe('AddToDoService', () => {
  let service: AddToDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToDoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
