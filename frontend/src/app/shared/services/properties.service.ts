import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class PropertiesService {
  constructor(private readonly apiService: ApiService) {}

  getPropertyListings() {
    const url = 'property/listings';
    return this.apiService.getApiCall(url);
  }

  addPropertyListing(params) {
    const url = 'property/add';
    return this.apiService.postApiCall(url, params);
  }
}
