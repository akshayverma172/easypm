import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  // isAuthenticated = false;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    // this.authService.loggedIn$.subscribe(isLoggedIn => {
    //   this.isAuthenticated = isLoggedIn;
    // });
    this.test();
  }

  async test() {
    const test = await this.authService.loggedIn$.toPromise();
  }
}
