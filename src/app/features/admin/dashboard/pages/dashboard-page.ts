import { Component, inject, OnInit } from '@angular/core';
import { AuthServices } from '@Features/auth/services/auth';
import { User } from '@Features/auth/models/auth.model';
import { BarChart } from '@Shared/components/bar-chart/bar-chart';
import { OrdersTable } from '@Shared/components/orders-table/orders-table';
import { RouterLink } from '@angular/router';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';

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
