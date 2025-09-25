import { Component, inject, OnInit, signal } from '@angular/core';
import { OrdersService } from '@Core/services/orders/orders.services';
import { Order } from '@Infrastructures/mocks/orders';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { ShopLayout } from '@Shared/components/layout/shop-layout/shop-layout';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';
import { AuthServices } from '../../auth/services/auth';
import { NoOrder } from '../components/no-order/no-order';
import { OrdersList } from '../components/orders-list/orders-list';

@Component({
  selector: 'app-account',
  templateUrl: './account.html',
  imports: [ShopLayout, ...TRANSLATE_IMPORTS, OrdersList, NoOrder],
})
export class AccountPage extends BaseComponent implements OnInit {
  authServices = inject(AuthServices);
  orderServices = inject(OrdersService);
  customerOrders = signal<Order[]>([]);

  ngOnInit() {
    const currentUser = this.authServices.getCurrentUser();
    if (currentUser) {
      this.customerOrders.set(this.orderServices.getOrdersByCustomer(currentUser.id));
    }
  }

  logout() {
    this.authServices.logout();
    window.location.reload();
  }
}
