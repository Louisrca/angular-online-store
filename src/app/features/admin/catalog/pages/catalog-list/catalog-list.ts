import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '@Features/shop/models/products.model';
import { CatalogServices } from '@Core/services/catalog/catalog.services';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { hugeDelete02 } from '@ng-icons/huge-icons';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.html',
  imports: [...TRANSLATE_IMPORTS, NgIcon, RouterLink],
  viewProviders: [provideIcons({ hugeDelete02 })],
})
export class CatalogList extends BaseComponent implements OnInit {
  catalogServices = inject(CatalogServices);

  products = signal<Product[]>([]);

  limit = 10;
  typeFilter = '';
  hugeDelete02 = 'hugeDelete02';
  private route = inject(ActivatedRoute);

  queryParams$: Observable<Record<string, string>> = this.route.queryParams;

  ngOnInit() {
    this.queryParams$.subscribe((params) => {
      const typeFilter = params['filter'];
      if (typeFilter) {
        this.products.set(this.catalogServices.productsByFilter(this.limit, typeFilter)());
        return;
      }
      this.products.set(this.catalogServices.productsByFilter(this.limit, typeFilter)());
    });
  }

  loadMore() {
    this.limit += 10;
    this.products.set(
      this.catalogServices.productsByFilter(
        this.limit,
        this.route.snapshot.queryParamMap.get('filter') || '',
      )(),
    );
  }

  hasMoreProducts(): boolean {
    return (
      this.products().length <
      this.catalogServices.productsLength(this.route.snapshot.queryParamMap.get('filter') || '')()
    );
  }

  removeProduct(id: string) {
    this.catalogServices.removeProduct(id);
    this.products.set(
      this.catalogServices.productsByFilter(
        this.limit,
        this.route.snapshot.queryParamMap.get('filter') || '',
      )(),
    );
  }
}
