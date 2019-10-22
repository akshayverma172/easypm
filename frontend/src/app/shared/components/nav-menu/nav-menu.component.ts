import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isAuthenticated: Boolean = false;
  constructor(
    private authService: AuthService,
    public jwtService: JwtHelperService
  ) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe(isLoggedIn => {
      this.isAuthenticated = isLoggedIn;
    });
  }
}
