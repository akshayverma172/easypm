import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  public readonly apiBaseUrl: string;

  constructor(private readonly http: HttpClient) {
    this.apiBaseUrl = environment.API_URL;
  }

  public getApiCall(url: string, params?: any): Observable<any> {
    return this.get(url, params);
  }

  public postApiCall(url: string, params: any): Observable<any> {
    return this.post(url, params);
  }

  private get(url: string, params?: any) {
    url = this.apiBaseUrl + url;
    return this.http.get(url, { params: params });
  }

  private post(url: string, params: any) {
    url = this.apiBaseUrl + url;
    return this.http.post(url, params);
  }
}
