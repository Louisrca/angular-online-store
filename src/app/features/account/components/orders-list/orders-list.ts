import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { OrdersService } from '@Core/services/orders/orders.services';
import { AuthServices } from '@Features/auth/services/auth';
import { Order } from '@Infrastructures/mocks/orders';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.html',
  standalone: true,
  imports: [...TRANSLATE_IMPORTS, DatePipe],
})
export class OrdersList extends BaseComponent implements OnInit {
  authServices = inject(AuthServices);
  orderServices = inject(OrdersService);
  customerOrders = signal<Order[]>([]);

  ngOnInit() {
    const currentUser = this.authServices.getCurrentUser();
    if (currentUser) {
      this.customerOrders.set(this.orderServices.getOrdersByCustomer(currentUser.id));
    }
  }
}
