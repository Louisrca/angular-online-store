import { Component, inject } from '@angular/core';
import { CartServices } from '../../../../features/cart/services/cart.services';
import { BaseComponent } from 'primeng/basecomponent';
import { TRANSLATE_IMPORTS } from '../../../imports/translate-imports';
import { CartItem } from '../../../../features/cart/models/cart.model';

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
        (item: CartItem, index: number, self: CartItem[]) =>
          index === self.findIndex((i) => i.id === item.id),
      );
  }
  getItemQuantity(item: CartItem): number {
    return this.cartServices.getItems().filter((i: CartItem) => i.id === item.id).length;
  }
}
