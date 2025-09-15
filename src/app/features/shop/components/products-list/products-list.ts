import { Component, inject, OnInit } from '@angular/core';
import { ShopServices } from '../../services/shop.services';
import { TranslatePipe } from '@ngx-translate/core';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.html',
  imports: [TranslatePipe, RouterLink, ...TRANSLATE_IMPORTS],
})
export class ProductsList extends BaseComponent implements OnInit {
  productsServices = inject(ShopServices);
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
}
