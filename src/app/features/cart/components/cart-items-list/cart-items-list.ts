import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';
import { CartItem } from '../../models/cart.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-cart-items-list',
  templateUrl: './cart-items-list.html',
  imports: [...TRANSLATE_IMPORTS, RouterLink, RouterLinkActive],
})
export class CartItemsList extends BaseComponent {
  @Input() items: CartItem[] = [];
  @Input() totalAmount = 0;
  @Input() removeItem!: (item: CartItem) => void;

  uuid = crypto.randomUUID();
}
