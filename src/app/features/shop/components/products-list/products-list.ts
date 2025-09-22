import { Component, inject, OnInit, signal } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/products.model';
import { CartServices } from '../../../cart/services/cart.services';
import { AuthServices } from '../../../auth/services/auth';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CatalogServices } from '@Core/services/catalog/catalog.services';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.html',
  host: { hostID: crypto.randomUUID().toString() },
  imports: [RouterLink, ...TRANSLATE_IMPORTS, ToastModule],
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

  messageService = inject(MessageService);

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

  showAuthToast() {
    this.messageService.add({
      id: this.uuid(),
      severity: 'info',
      summary: 'Sticky',
      detail: 'productElement.toast.loginToAddProducts',
      life: 5000,
      styleClass: 'custom-toast',
    });
  }

  addToCart(product: Product) {
    if (!this.authServices.isLoggedIn()) {
      this.showAuthToast();
      return;
    }
    const { id, name, type, color, price, imageUrl } = product;

    this.cartServices.addItem({
      id,
      name,
      type,
      color,
      price,
      imageUrl,
      userId: this.authServices.getCurrentUser().id,
      cartItemId: this.uuid(),
    });
  }
}
