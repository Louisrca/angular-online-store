import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthServices } from '@Features/auth/services/auth';
import { User } from '@Features/auth/models/auth.model';
import { BarChart } from '@Shared/components/bar-chart/bar-chart';
import { OrdersTable } from '@Shared/components/orders-table/orders-table';
import { RouterLink } from '@angular/router';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';
import { CardInfo } from '@Shared/components/design-system/card-info/card-info';
import { SalesService } from '@Core/services/sales/sales.services';
import { OrdersService } from '@Core/services/orders/orders.services';
import { provideIcons } from '@ng-icons/core';
import { hugeDeliveryBox01, hugeSaleTag02, hugeUserFullView } from '@ng-icons/huge-icons';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.html',
  imports: [BarChart, OrdersTable, RouterLink, ...TRANSLATE_IMPORTS, CardInfo],
  viewProviders: [
    provideIcons({
      hugeSaleTag02,
      hugeDeliveryBox01,
      hugeUserFullView,
    }),
  ],
})
export class DashboardPage extends BaseComponent implements OnInit {
  private authService = inject(AuthServices);
  private salesService = inject(SalesService);
  private ordersService = inject(OrdersService);
  private userService = inject(AuthServices);
  currentUser: User | null = null;
  sales = signal(0);
  orders = signal(0);
  users = signal(0);
  hugeSaleTag02 = 'hugeSaleTag02';
  hugeDeliveryBox01 = 'hugeDeliveryBox01';
  hugeUserFullView = 'hugeUserFullView';

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();

    this.sales.set(
      this.salesService
        .getSales()
        .filter((sales) => sales.saleType === 'sale')
        .reduce((acc, sale) => acc + sale.amount, 0),
    );

    this.orders.set(this.ordersService.getOrders().length);
    this.users.set(this.userService.getCustomers().length);
  }
}
