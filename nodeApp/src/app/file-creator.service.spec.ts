import { TestBed, inject } from '@angular/core/testing';

import { FileCreatorService } from './file-creator.service';

describe('FileCreatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileCreatorService]
    });
  });

  it('should be created', inject([FileCreatorService], (service: FileCreatorService) => {
    expect(service).toBeTruthy();
  }));
});
