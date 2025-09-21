import { Routes } from '@angular/router';
import { AdminPage } from './pages/admin-page';
import { DashboardPage } from './pages/dashboard/dashboard-page';
import { CatalogPage } from './pages/catalog/catalog-page';
import { UsersPage } from './pages/users/users-page';
import { AdminGuard } from '../../core/guards/admin/admin-guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: '',
        component: DashboardPage,
      },
      {
        path: 'catalog',
        component: CatalogPage,
      },
      {
        path: 'users',
        component: UsersPage,
        canActivate: [AdminGuard],
      },
    ],
  },
];
