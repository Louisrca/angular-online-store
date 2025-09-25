import { Component, inject, OnInit, signal } from '@angular/core';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/products.model';
import { CartServices } from '../../../cart/services/cart.services';
import { AuthServices } from '../../../auth/services/auth';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CatalogServices } from '@Core/services/catalog/catalog.services';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.html',
  imports: [RouterLink, ...TRANSLATE_IMPORTS],
})
export class ProductsList extends BaseComponent implements OnInit {
  catalogServices = inject(CatalogServices);
  cartServices = inject(CartServices);
  authServices = inject(AuthServices);
  products = signal<Product[]>([]);
  uuid = uuidv4;
  limit = 8;

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
}
