import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { hugeDashboardBrowsing, hugeCatalogue, hugeUserMultiple } from '@ng-icons/huge-icons';
import { AdminNavLink } from '../design-system/admin-nav-link/admin-nav-link';
import { TranslateButtons } from '../design-system/translate-buttons/translate-buttons';
import { AdminOnlyDirective } from '../../directives/admin-only/admin-only.directive';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.html',
  imports: [AdminNavLink, TranslateButtons, TranslateButtons, AdminOnlyDirective],
  viewProviders: [provideIcons({ hugeDashboardBrowsing, hugeCatalogue, hugeUserMultiple })],
})
export class AdminNav {
  hugeDashboardBrowsing = 'hugeDashboardBrowsing';
  hugeCatalogue = 'hugeCatalogue';
  hugeUserMultiple = 'hugeUserMultiple';
}
