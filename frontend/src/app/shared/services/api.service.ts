import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
  public readonly apiBaseUrl: string;

  constructor(private readonly http: HttpClient) {
    this.apiBaseUrl = environment.API_URL;
  }

  public getApiCall(url: string, params?: any): Observable<any> {
    url = this.apiBaseUrl + url;

    return this.get(url);
  }

  public postApiCall(url: string, query: any, params: any): Observable<any> {
    url = this.apiBaseUrl + url;
    return this.http.post(url, query, { params });
  }

  private get(url: string, params?: any) {
    url = this.apiBaseUrl + url;
    return this.http.get(url, { params: params });
  }
}
