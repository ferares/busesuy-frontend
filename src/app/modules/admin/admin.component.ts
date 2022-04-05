import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  loggedIn = false;

  constructor(private router: Router, private authService: AuthService) {
    this.loggedIn = this.authService.isLoggedIn();
    if (this.loggedIn) this.authService.refreshLogin().subscribe();
    this.authService.loggedInChange$.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
      if (!loggedIn) this.router.navigate(['admin', 'login']);
    });
  }

  logout() {
    this.authService.logout();
  }
}
