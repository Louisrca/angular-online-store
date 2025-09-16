import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { hugeDashboardBrowsing, hugeCatalogue } from '@ng-icons/huge-icons';
import { AdminNavLink } from '../design-system/admin-nav-link/admin-nav-link';
import { TranslateButtons } from '../design-system/translate-buttons/translate-buttons';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.html',
  imports: [AdminNavLink, TranslateButtons, TranslateButtons],
  viewProviders: [provideIcons({ hugeDashboardBrowsing, hugeCatalogue })],
})
export class AdminNav {
  hugeDashboardBrowsing = 'hugeDashboardBrowsing';
  hugeCatalogue = 'hugeCatalogue';
}
