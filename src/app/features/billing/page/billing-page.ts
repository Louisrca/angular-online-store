import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrdersService } from '@Core/services/orders/orders.services';
import { Order } from '@Infrastructures/mocks/orders';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { ShopLayout } from '@Shared/components/layout/shop-layout/shop-layout';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-billing-page',
  templateUrl: './billing-page.html',
  imports: [ShopLayout, DatePipe, ...TRANSLATE_IMPORTS, RouterLink],
})
export class BillingPage extends BaseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  orderServices = inject(OrdersService);
  order = signal<Order | undefined>(undefined);

  queryParams$: Observable<Record<string, string>> = this.route.queryParams;

  ngOnInit() {
    this.queryParams$.subscribe((params) => {
      const orderId = params['orderId'];
      if (orderId) {
        this.order.set(this.orderServices.getOrderById(orderId));
      }
    });
  }
}
