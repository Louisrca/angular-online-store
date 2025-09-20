import { Component, inject } from '@angular/core';
import { AuthServices } from '../auth/services/auth';

@Component({
  selector: 'app-account',
  templateUrl: './account.html',
})
export class AccountPage {
  authServices = inject(AuthServices);
  logout() {
    this.authServices.logout();
    window.location.reload();
  }
}
