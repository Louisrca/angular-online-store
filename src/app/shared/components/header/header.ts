import { Component, inject } from '@angular/core';
import { BaseComponent } from '../base-translate/base-translate';
import { provideIcons } from '@ng-icons/core';
import { hugeShoppingBag02, hugeUser } from '@ng-icons/huge-icons';
import { IconLayout } from '../layout/icon-layout/icon-layout';
import { TranslateButtons } from '../design-system/translate-buttons/translate-buttons';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../../features/auth/services/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [IconLayout, TranslateButtons, RouterLink],
  viewProviders: [provideIcons({ hugeShoppingBag02, hugeUser })],
})
export class Header extends BaseComponent {
  hugeShoppingBag02 = 'hugeShoppingBag02';
  hugeUser = 'hugeUser';

  auth = inject(AuthServices);
  router = inject(Router);

  goToAccount() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/account']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
