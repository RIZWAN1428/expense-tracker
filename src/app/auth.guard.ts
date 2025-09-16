import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
constructor(private router: Router, private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.auth.getToken();
    if (!token || !this.auth.isLoggedIn()) {
      this.router.navigate(['/login'], { queryParams: { redirect: state.url } });
      return false;
    }

    try {
      const userRole = this.auth.getUserRole();
      const requiredRoles = route.data['roles'] as string[] | undefined;

      if (requiredRoles && requiredRoles.length > 0) {
        const allowed = !!userRole && (requiredRoles.includes(userRole) || userRole === 'ADMIN');
        if (!allowed) {
          alert('Access denied');
          this.router.navigate(['/dashboard']);
          return false;
        }
      }
    } catch {
      this.auth.logout();
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
