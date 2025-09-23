import { Routes } from '@angular/router';
import { CatalogPage } from './pages/catalog-page';
import { AddProduct } from './components/add-product/add-product';
import { CatalogList } from './components/catalog-list/catalog-list';

export const CATALOG_ROUTES: Routes = [
  {
    path: '',
    component: CatalogPage,
    children: [
      {
        path: '',
        component: CatalogList,
      },
      {
        path: 'add-product',
        component: AddProduct,
      },
    ],
  },
];
