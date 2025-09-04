import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'shop',
    loadChildren: () => import('./features/shop/shop.routes').then((m) => m.SHOP_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'shop',
  },
];
