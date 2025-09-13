import { Routes } from '@angular/router';
import { AdminPage } from './pages/admin-page';
import { DashboardPage } from './pages/dashboard/dashboard-page';
import { CatalogPage } from './pages/catalog/catalog-page';

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
    ],
  },
];
