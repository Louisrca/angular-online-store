import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopServices } from '../../services/shop.services';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/products.model';
import { CartServices } from '../../../cart/services/cart.services';
import { AuthServices } from '../../../auth/services/auth';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.html',
  imports: [RouterLink, ...TRANSLATE_IMPORTS, ToastModule],
  providers: [MessageService],
})
export class ProductsList extends BaseComponent implements OnInit {
  productsServices = inject(ShopServices);
  cartServices = inject(CartServices);
  authServices = inject(AuthServices);
  products = signal<Product[]>([]);
  limit = 8;

  private route = inject(ActivatedRoute);

  queryParams$: Observable<Record<string, string>> = this.route.queryParams;

  messageService = inject(MessageService);

  ngOnInit() {
    this.queryParams$.subscribe((params) => {
      const typeFilter = params['filter'];
      if (typeFilter) {
        this.products.set(this.productsServices.getProducts(this.limit, typeFilter));
        return;
      }
      this.products.set(this.productsServices.getProducts(this.limit));
    });
  }

  loadMore() {
    this.limit += 10;
    this.products.set(
      this.productsServices.getProducts(
        this.limit,
        this.route.snapshot.queryParamMap.get('filter') || '',
      ),
    );
  }

  hasMoreProducts(): boolean {
    return (
      this.products().length <
      this.productsServices.getProductLength(this.route.snapshot.queryParamMap.get('filter') || '')
    );
  }

  showAuthToast() {
    this.messageService.add({
      severity: 'info',
      summary: 'Sticky',
      detail: 'productElement.toast.loginToAddProducts',
      sticky: true,
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
    });
  }
}
