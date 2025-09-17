import { Component, inject, OnInit } from '@angular/core';
import { ShopServices } from '../../services/shop.services';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/products.model';
import { CartServices } from '../../../cart/services/cart.services';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.html',
  imports: [RouterLink, ...TRANSLATE_IMPORTS],
})
export class ProductsList extends BaseComponent implements OnInit {
  productsServices = inject(ShopServices);
  cartServices = inject(CartServices);
  products: Product[] = [];
  limit = 8;

  ngOnInit() {
    this.products = this.productsServices.getProducts(this.limit);
  }

  loadMore() {
    this.limit += 10;
    this.products = this.productsServices.getProducts(this.limit);
  }

  hasMoreProducts(): boolean {
    return this.products.length < this.productsServices.getProductLength();
  }

  addToCart(product: Product) {
    const { id, name, type, color, price, imageUrl } = product;
    this.cartServices.addItem({ id, name, type, color, price, imageUrl });
  }
}
