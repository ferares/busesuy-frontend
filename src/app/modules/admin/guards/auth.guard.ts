import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (childRoute.routeConfig?.path === 'login') {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['admin']);
        return false;
      }
      return true;
    }
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['admin', 'login']);
      return false;
    }
    return true;
  }
}
