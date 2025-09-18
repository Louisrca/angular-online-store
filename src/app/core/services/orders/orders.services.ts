import { Injectable, signal } from '@angular/core';
import { ORDERS } from '../../../infrastructures/mocks/orders';
import { Order } from '../../../infrastructures/mocks/orders';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orders = signal<Order[]>(ORDERS);

  constructor() {
    const local = localStorage.getItem('orders');
    if (local) {
      this.orders.set(JSON.parse(local));
    } else {
      localStorage.setItem('orders', JSON.stringify(ORDERS));
    }
  }

  getOrders() {
    const local = localStorage.getItem('orders');
    return local
      ? (JSON.parse(local).sort(
          (a: Order, b: Order) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        ) as Order[])
      : [];
  }

  getOrdersByCustomer(customerId: number) {
    return this.getOrders().filter((o) => o.customerId === customerId);
  }

  postOrder(order: Order) {
    this.orders.update((orders) => [...orders, order]);
    localStorage.setItem('orders', JSON.stringify(this.orders()));
  }
}
