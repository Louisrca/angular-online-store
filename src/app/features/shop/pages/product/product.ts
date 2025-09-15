import { Component } from '@angular/core';
import { ShopLayout } from '../../../../shared/components/layout/shop-layout/shop-layout';
import { ProductDetails } from '../../components/product-details/product-details';

@Component({
  selector: 'app-product',
  templateUrl: './product.html',
  imports: [ShopLayout, ProductDetails],
})
export class ProductPage {}
