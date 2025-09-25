import { Component, computed, inject } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../shared/imports/translate-imports';
import { ShopLayout } from '../../../shared/components/layout/shop-layout/shop-layout';
import { SalesService } from '../../../core/services/sales/sales.services';
import { CartServices } from '../services/cart.services';
import { CartItem } from '../models/cart.model';
import { OrdersService } from '../../../core/services/orders/orders.services';
import { ulid } from 'ulid';
import { v4 as uuidv4 } from 'uuid';
import { AuthServices } from '../../auth/services/auth';
import { CartItemsList } from '../components/cart-items-list/cart-items-list';
import { EmptyCartDirective } from '../../../shared/directives/empty-cart/empty-cart.directive';
import { NotEmptyCartDirective } from '../../../shared/directives/not-empty-cart/not-empty-cart.directive';
import { EmptyCart } from '../components/empty-cart/empty-cart';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CatalogServices } from '@Core/services/catalog/catalog.services';

@Component({
  selector: 'app-cart-page',
  imports: [
    ...TRANSLATE_IMPORTS,
    ShopLayout,
    ToastModule,
    CartItemsList,
    EmptyCart,
    EmptyCartDirective,
    NotEmptyCartDirective,
  ],
  host: { hostID: crypto.randomUUID().toString() },
  templateUrl: './cart-page.html',
  providers: [MessageService],
})
export class CartPage extends BaseComponent {
  salesServices = inject(SalesService);
  cartServices = inject(CartServices);
  ordersServices = inject(OrdersService);
  catalogServices = inject(CatalogServices);
  authServices = inject(AuthServices);
  messageService = inject(MessageService);

  orderId = ulid();
  salesId = uuidv4;
  uuid = uuidv4;

  cartItems = computed<CartItem[]>(() =>
    this.cartServices.getItemsByUser(this.authServices.getCurrentUser().id),
  );

  totalAmount = computed<number>(() =>
    this.cartItems().reduce((total, item) => total + Number(item.price), 0),
  );

  getItemQuantity(item: CartItem): number {
    return this.cartItems().filter((i) => i.id === item.id).length;
  }

  removeItem(item: CartItem) {
    this.cartServices.removeItem(item);
  }
}
