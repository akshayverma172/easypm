import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean>;

  get loggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private apiService: ApiService) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
    if (localStorage.getItem('access_token')) {
      this.loggedIn.next(true);
    }
  }

  login(username: string, password: string): Observable<boolean> {
    const query = {};
    return this.apiService
      .postApiCall('authenticate', query, { username, password })
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    return this.loggedIn.next(false);
  }
}
