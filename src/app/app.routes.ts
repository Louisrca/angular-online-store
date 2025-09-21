import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth-guard';
import { WorkerGuard } from './core/guards/worker/worker-guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/shop/shop.routes').then((m) => m.SHOP_ROUTES),
  },
  {
    path: 'cart',
    loadChildren: () => import('./features/cart/cart.routes').then((m) => m.CART_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
    canActivate: [WorkerGuard],
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.routes').then((m) => m.ACCOUNT_ROUTES),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'shop',
  },
];
