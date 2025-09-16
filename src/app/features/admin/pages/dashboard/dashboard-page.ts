import { Component, inject, OnInit } from '@angular/core';
import { AuthServices } from '../../../auth/services/auth';
import { User } from '../../../auth/models/auth.model';
import { BarChart } from '../../../../shared/components/design-system/bar-chart/bar-chart';
import { OrdersTable } from '../../../../shared/components/design-system/orders-table/orders-table';
import { RouterLink } from '@angular/router';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.html',
  imports: [BarChart, OrdersTable, RouterLink, ...TRANSLATE_IMPORTS],
})
export class DashboardPage extends BaseComponent implements OnInit {
  private authService = inject(AuthServices);
  currentUser: User | null = null;

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }
}
