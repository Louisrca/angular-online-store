import { Component, inject, OnInit } from '@angular/core';
import { ShopServices } from '../../services/shop.services';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/products.model';
import { CartServices } from '../../../cart/services/cart.services';
import { AuthServices } from '../../../auth/services/auth';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
  products: Product[] = [];
  limit = 8;

  messageService = inject(MessageService);

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
