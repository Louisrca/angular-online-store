import { Component, inject } from '@angular/core';
import { ShopServices } from '@Features/shop/services/shop.services';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.html',
  imports: [...TRANSLATE_IMPORTS],
})
export class CatalogList extends BaseComponent {
  products = inject(ShopServices);

  allProducts = this.products.allProducts();
}
