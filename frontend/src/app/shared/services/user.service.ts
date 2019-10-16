import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class UserService {
  constructor(private apiService: ApiService) {}

  public addUser(username: string, password: string) {
    const url = 'users/signup';
    const query = { username, password };
    return this.apiService.postApiCall(url, query, {});
  }

  public findUserByUsername(username: string) {
    const url = `users/find`;
    const query = { username };
    return this.apiService.postApiCall(url, query, {});
  }
}
