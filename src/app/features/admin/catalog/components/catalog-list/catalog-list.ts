import { Component, inject } from '@angular/core';
import { CatalogServices } from '@Core/services/catalog/catalog.services';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.html',
  imports: [...TRANSLATE_IMPORTS],
})
export class CatalogList extends BaseComponent {
  catalogService = inject(CatalogServices);

  allProducts = this.catalogService.allProducts();
}
