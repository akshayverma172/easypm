import {
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EasypmHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request);
  }
}
