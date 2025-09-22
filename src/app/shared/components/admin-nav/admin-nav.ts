import { Component, inject } from '@angular/core';
import { provideIcons, NgIcon } from '@ng-icons/core';
import {
  hugeDashboardBrowsing,
  hugeCatalogue,
  hugeUserMultiple,
  hugeLogin02,
  hugeDeliveryBox01,
} from '@ng-icons/huge-icons';
import { AdminNavLink } from '../design-system/admin-nav-link/admin-nav-link';
import { TranslateButtons } from '../design-system/translate-buttons/translate-buttons';
import { AdminOnlyDirective } from '../../directives/admin-only/admin-only.directive';
import { AuthServices } from '@Features/auth/services/auth';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.html',
  imports: [AdminNavLink, TranslateButtons, TranslateButtons, AdminOnlyDirective, NgIcon],
  viewProviders: [
    provideIcons({
      hugeDashboardBrowsing,
      hugeCatalogue,
      hugeUserMultiple,
      hugeLogin02,
      hugeDeliveryBox01,
    }),
  ],
})
export class AdminNav {
  authServices = inject(AuthServices);
  hugeDashboardBrowsing = 'hugeDashboardBrowsing';
  hugeCatalogue = 'hugeCatalogue';
  hugeUserMultiple = 'hugeUserMultiple';
  hugeLogin02 = 'hugeLogin02';
  hugeDeliveryBox01 = 'hugeDeliveryBox01';

  logout() {
    this.authServices.logout();
    window.location.reload();
  }
}
