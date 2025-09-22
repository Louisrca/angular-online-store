import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart-items-list',
  templateUrl: './cart-items-list.html',
  imports: [...TRANSLATE_IMPORTS],
})
export class CartItemsList extends BaseComponent {
  @Input() items: CartItem[] = [];
  @Input() totalAmount = 0;
  @Input() buy!: () => void;
  @Input() removeItem!: (item: CartItem) => void;

  buyItems() {
    this.buy();
  }
}
