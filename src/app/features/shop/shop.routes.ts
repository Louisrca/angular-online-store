import { Routes } from '@angular/router';
import { ShopPage } from './pages/shop-page';
import { ProductPage } from './pages/product/product';

export const SHOP_ROUTES: Routes = [
  {
    path: '',
    component: ShopPage,
  },
  { path: 'product/:id', component: ProductPage },
];
