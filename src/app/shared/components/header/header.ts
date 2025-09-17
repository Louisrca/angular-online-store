import { Component, inject } from '@angular/core';
import { BaseComponent } from '../base-translate/base-translate';
import { provideIcons } from '@ng-icons/core';
import { hugeShoppingBag02, hugeUser, hugeMenu09 } from '@ng-icons/huge-icons';
import { IconLayout } from '../layout/icon-layout/icon-layout';
import { TranslateButtons } from '../design-system/translate-buttons/translate-buttons';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../../features/auth/services/auth';
import { TRANSLATE_IMPORTS } from '../../imports/translate-imports';
import { CartServices } from '../../../features/cart/services/cart.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [IconLayout, TranslateButtons, RouterLink, ...TRANSLATE_IMPORTS],
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
    return this.cartServices.getItems().length > 0;
  }

  itemsInCart(): number | string {
    const cartLength = this.cartServices.getItems().length;
    if (cartLength < 10) {
      return this.cartServices.getItems().length;
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
