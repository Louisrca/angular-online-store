import { Component, inject } from '@angular/core';
import { ShopServices } from '../../services/shop.services';

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList {
  productsServices = inject(ShopServices);
  products = this.productsServices.getProducts();
}
