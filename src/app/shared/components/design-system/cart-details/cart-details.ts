import { Component, inject } from '@angular/core';
import { CartServices } from '../../../../features/cart/services/cart.services';
import { BaseComponent } from 'primeng/basecomponent';
import { TRANSLATE_IMPORTS } from '../../../imports/translate-imports';
import { CART_ITEM } from '../../../../features/cart/models/cart.model';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.html',
  imports: [...TRANSLATE_IMPORTS],
})
export class CartDetails extends BaseComponent {
  cartServices = inject(CartServices);

  getItems() {
    return this.cartServices
      .getItems()
      .filter(
        (item: CART_ITEM, index: number, self: CART_ITEM[]) =>
          index === self.findIndex((i) => i.id === item.id),
      );
  }
  getItemQuantity(item: CART_ITEM): number {
    return this.cartServices.getItems().filter((i: CART_ITEM) => i.id === item.id).length;
  }
}
