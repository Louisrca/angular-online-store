import { Injectable } from '@angular/core';
import { ORDERS } from '../../../infrastructures/mocks/orders';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orders = ORDERS;

  getOrders() {
    return this.orders;
  }

  getOrdersByCustomer(customerId: number) {
    return this.orders.filter((o) => o.customerId === customerId);
  }
}
