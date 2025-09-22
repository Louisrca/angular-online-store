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
})
export class CartPage extends BaseComponent {
  salesServices = inject(SalesService);
  cartServices = inject(CartServices);
  ordersServices = inject(OrdersService);
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
  showAuthToast() {
    this.messageService.add({
      id: this.uuid(),
      severity: 'info',
      summary: 'Sticky',
      detail: 'cartPage.successfullyPurchased',
      sticky: true,
      styleClass: 'custom-toast',
    });
  }
  buy() {
    // Create the sale
    this.salesServices.postSales({
      id: this.salesId(),
      date: new Date(),
      amount: this.totalAmount(),
      items: this.cartItems().map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
      })),
      saleType: 'sale',
    });

    // Create the order
    this.ordersServices.postOrder({
      id: `ORDER_${this.orderId}`,
      customerId: this.authServices.getCurrentUser().id,
      customerName: this.authServices.getCurrentUser().name,
      customerEmail: this.authServices.getCurrentUser().email,
      customerAddress: '123 Main St, City, Country',
      date: new Date(),
      items: this.cartItems().map((item) => ({
        productId: item.id,
        productName: item.name,
        price: item.price,
        quantity: this.getItemQuantity(item),
        userId: item.userId,
      })),
      amount: this.totalAmount(),
      type: 'purchase',
    });
    this.showAuthToast();
    this.cartServices.clearCart(this.authServices.getCurrentUser().id);
  }
}
