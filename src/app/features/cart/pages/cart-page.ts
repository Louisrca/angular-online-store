import { Component, inject } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../shared/imports/translate-imports';
import { ShopLayout } from '../../../shared/components/layout/shop-layout/shop-layout';
import { SalesService } from '../../../core/services/sales/sales.services';
import { CartServices } from '../services/cart.services';
import { CartItem } from '../models/cart.model';
import { OrdersService } from '../../../core/services/orders/orders.services';
import { ulid } from 'ulid';
import { AuthServices } from '../../auth/services/auth';
@Component({
  selector: 'app-cart-page',
  imports: [...TRANSLATE_IMPORTS, ShopLayout],
  templateUrl: './cart-page.html',
})
export class CartPage extends BaseComponent {
  salesServices = inject(SalesService);
  cartServices = inject(CartServices);
  ordersServices = inject(OrdersService);
  authServices = inject(AuthServices);

  orderId = ulid();

  getCartItems(): CartItem[] {
    return this.cartServices.getItemsByUser(this.authServices.getCurrentUser().id);
  }

  getItemQuantity(item: CartItem): number {
    return this.cartServices
      .getItemsByUser(this.authServices.getCurrentUser().id)
      .filter((i: CartItem) => i.id === item.id).length;
  }

  totalAmount(): number {
    return this.cartServices
      .getItemsByUser(this.authServices.getCurrentUser().id)
      .reduce((total: number, item: CartItem) => total + Number(item.price), 0);
  }

  buy() {
    this.salesServices.postSales({
      id: 'acb-321c12ab2-1a3b-4c5d-9e6f-7g8h9i0j1k2l',
      date: new Date(),
      amount: this.totalAmount(),
      items: [
        this.cartServices
          .getItemsByUser(this.authServices.getCurrentUser().id)
          .map((item: CartItem) => ({ id: item.id, name: item.name, price: item.price })),
      ],
      saleType: 'sale',
    });
    this.ordersServices.postOrder({
      id: this.orderId,
      customerId: this.authServices.getCurrentUser().id,
      customerName: this.authServices.getCurrentUser().name,
      customerEmail: this.authServices.getCurrentUser().email,
      customerAddress: '123 Main St, City, Country',
      date: new Date(),
      items: this.cartServices
        .getItemsByUser(this.authServices.getCurrentUser().id)
        .map((item: CartItem) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: this.getItemQuantity(item),
          userId: item.userId,
        })),
      amount: this.totalAmount(),
      type: 'purchase',
    });
    this.cartServices.clearCart(this.authServices.getCurrentUser().id);
  }
}
