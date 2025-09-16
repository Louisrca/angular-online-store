import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServices } from '../../../features/auth/services/auth';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  router = inject(Router);
  auth = inject(AuthServices);

  canActivate(): boolean {
    if (this.auth.isLoggedIn() && this.auth.isAdmin()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
