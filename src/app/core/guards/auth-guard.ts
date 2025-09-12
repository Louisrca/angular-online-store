import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const user = localStorage.getItem('user');
  if (!user) {
    // User is not authenticated
    return false;
  }
  return true;
};
