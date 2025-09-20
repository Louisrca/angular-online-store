import { Component, inject } from '@angular/core';
import { BaseComponent } from '../base-translate/base-translate';
import { provideIcons } from '@ng-icons/core';
import { hugeShoppingBag02, hugeUser, hugeMenu09 } from '@ng-icons/huge-icons';
import { IconLayout } from '../layout/icon-layout/icon-layout';
import { TranslateButtons } from '../design-system/translate-buttons/translate-buttons';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServices } from '../../../features/auth/services/auth';
import { TRANSLATE_IMPORTS } from '../../imports/translate-imports';
import { CartServices } from '../../../features/cart/services/cart.services';
import { AdminOnlyDirective } from '../../directives/admin-only/admin-only.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [
    IconLayout,
    TranslateButtons,
    RouterLink,
    ...TRANSLATE_IMPORTS,
    RouterLinkActive,
    AdminOnlyDirective,
  ],
  standalone: true,
  viewProviders: [provideIcons({ hugeShoppingBag02, hugeUser, hugeMenu09 })],
})
export class Header extends BaseComponent {
  auth = inject(AuthServices);
  router = inject(Router);
  cartServices = inject(CartServices);

  hugeShoppingBag02 = 'hugeShoppingBag02';
  hugeUser = 'hugeUser';
  hugeMenu09 = 'hugeMenu09';

  isDisplayBlock = false;

  isCartNotEmpty(): boolean {
    if (!this.auth.isLoggedIn()) {
      return false;
    }
    return this.cartServices.getItemsByUser(this.auth.getCurrentUser().id).length > 0;
  }

  itemsInCart(): number | string {
    if (!this.auth.isLoggedIn()) {
      return 0;
    }
    const cartLength = this.cartServices.getItemsByUser(this.auth.getCurrentUser().id).length;
    if (cartLength < 10) {
      return cartLength;
    } else {
      return '9+';
    }
  }

  goToAccount() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/account']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  toggleMobileMenu() {
    this.isDisplayBlock = !this.isDisplayBlock;
  }
}
