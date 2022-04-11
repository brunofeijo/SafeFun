import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    ) { }

  canActivate(): boolean {
    let token = localStorage.getItem('token');
    token = this.auth.loginJSON.idToken;
    if (token === null || token === undefined) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
