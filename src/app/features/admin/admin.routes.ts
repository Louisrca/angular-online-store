import { Routes } from '@angular/router';
import { AdminPage } from './admin-page';
import { DashboardPage } from './dashboard/pages/dashboard-page';
import { UsersPage } from './users/pages/users-page';
import { AdminGuard } from '@Core/guards/admin/admin-guard';

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
        loadChildren: () => import('./catalog/catalog.routes').then((m) => m.CATALOG_ROUTES),
        canActivate: [AdminGuard],
      },
      {
        path: 'users',
        component: UsersPage,
        canActivate: [AdminGuard],
      },
    ],
  },
];
