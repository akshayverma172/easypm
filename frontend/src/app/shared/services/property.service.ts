import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { ApiService } from './api.service';

@Injectable()
export class PropertyService {
  constructor(
    private readonly apiService: ApiService,
    private http: HttpClient
  ) {}

  public getPropertyListings(
    query: any = {},
    params: { limit: number; offset: number } = { limit: 10, offset: 0 }
  ): Observable<Property[]> {
    const url = 'property';
    return this.apiService.postApiCall(url, query, { params });
  }

  addPropertyListing(params) {
    const url = 'property/add';
    const query: any = {};
    return this.apiService.postApiCall(url, query, params);
  }

  // public queryProperties(
  //   query: any = {},
  //   params: { limit: number; offset: number } = { limit: 10, offset: 0 }
  // ): Observable<Property[]> {
  //   const path = 'http://localhost:3000/api/property';
  //   return this.http.post<Property[]>(path, query, {
  //     params: {
  //       limit: `${params.limit}`,
  //       offset: `${params.offset}`
  //     }
  //   });
  // }
}
