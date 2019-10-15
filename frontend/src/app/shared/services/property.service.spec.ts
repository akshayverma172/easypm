import { TestBed, inject } from '@angular/core/testing';

import { PropertyService } from './property.service';

describe('PropertiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertyService]
    });
  });

  it('should be created', inject(
    [PropertyService],
    (service: PropertyService) => {
      expect(service).toBeTruthy();
    }
  ));
});
