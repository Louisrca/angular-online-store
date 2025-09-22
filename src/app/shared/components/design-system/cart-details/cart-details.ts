import { Component, inject } from '@angular/core';
import { CartServices } from '../../../../features/cart/services/cart.services';
import { BaseComponent } from 'primeng/basecomponent';
import { TRANSLATE_IMPORTS } from '../../../imports/translate-imports';
import { CartItem } from '../../../../features/cart/models/cart.model';
import { AuthServices } from '../../../../features/auth/services/auth';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.html',
  imports: [...TRANSLATE_IMPORTS],
})
export class CartDetails extends BaseComponent {
  cartServices = inject(CartServices);
  authServices = inject(AuthServices);

  getItems() {
    return this.cartServices
      .getItemsByUser(this.authServices.getCurrentUser().id)
      .filter(
        (item: CartItem, index: number, self: CartItem[]) =>
          index === self.findIndex((itemIndex) => itemIndex.id === item.id),
      );
  }
  getItemQuantity(item: CartItem): number {
    return this.cartServices
      .getItemsByUser(this.authServices.getCurrentUser().id)
      .filter((itemIndex: CartItem) => itemIndex.id === item.id).length;
  }
}
