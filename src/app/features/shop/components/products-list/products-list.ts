import { Component, inject } from '@angular/core';
import { ShopServices } from '../../services/shop.services';
import { TranslatePipe } from '@ngx-translate/core';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
  imports: [TranslatePipe, ...TRANSLATE_IMPORTS],
})
export class ProductsList extends BaseComponent {
  productsServices = inject(ShopServices);

  products = this.productsServices.getProducts();
}
