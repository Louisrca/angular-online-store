import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OrdersService } from '../../../../core/services/orders/orders.services';
import { DatePipe } from '@angular/common';
import { TRANSLATE_IMPORTS } from '../../../imports/translate-imports';
import { BaseComponent } from '../../base-translate/base-translate';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.html',
  imports: [TableModule, DatePipe, ...TRANSLATE_IMPORTS],
})
export class OrdersTable extends BaseComponent {
  ordersServices = inject(OrdersService);

  orders$ = this.ordersServices.getOrders();
}
