import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { hugeDashboardBrowsing, hugeCatalogue } from '@ng-icons/huge-icons';
import { AdminNavLink } from '../design-system/admin-nav-link/admin-nav-link';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.html',
  imports: [RouterLink, AdminNavLink],
  viewProviders: [provideIcons({ hugeDashboardBrowsing, hugeCatalogue })],
})
export class AdminNav {
  hugeDashboardBrowsing = 'hugeDashboardBrowsing';
  hugeCatalogue = 'hugeCatalogue';
}
