import { Component, inject, OnInit } from '@angular/core';
import { AuthServices } from '../../../auth/services/auth';
import { User } from '../../../auth/models/auth.model';
import { BarChart } from '../../../../shared/components/design-system/bar-chart/bar-chart';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.html',
  imports: [BarChart],
})
export class DashboardPage implements OnInit {
  private authService = inject(AuthServices);
  currentUser: User | null = null;

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }
}
