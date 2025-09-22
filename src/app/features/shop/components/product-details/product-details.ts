import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShopServices } from '../../services/shop.services';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';
import { NgIcon } from '@ng-icons/core';
import { hugeArrowRight01, hugeArrowDown01 } from '@ng-icons/huge-icons';
import { provideIcons } from '@ng-icons/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Product } from '../../models/products.model';
import { AuthServices } from '../../../auth/services/auth';
import { CartServices } from '../../../cart/services/cart.services';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  host: { hostID: crypto.randomUUID().toString() },
  imports: [...TRANSLATE_IMPORTS, NgIcon, ToastModule, RouterLink],
  viewProviders: [
    provideIcons({
      hugeArrowRight01,
      hugeArrowDown01,
    }),
  ],
})
export class ProductDetails extends BaseComponent implements OnInit {
  productId!: string;

  shopServices = inject(ShopServices);
  route = inject(ActivatedRoute);
  authServices = inject(AuthServices);
  cartServices = inject(CartServices);
  isDescriptionOpen = false;
  isDeliveryAndReturnsOpen = false;
  hugeArrowDown01 = 'hugeArrowDown01';
  hugeArrowRight01 = 'hugeArrowRight01';
  uuid = uuidv4();
  messageService = inject(MessageService);

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
  }

  showAuthToast() {
    this.messageService.add({
      severity: 'info',
      summary: 'Sticky',
      detail: 'productElement.toast.loginToAddProducts',
      life: 5000,
      styleClass: 'custom-toast',
    });
  }

  getProductDetails() {
    return this.shopServices.getProductById(this.productId);
  }
  addToCart() {
    if (!this.authServices.isLoggedIn()) {
      this.showAuthToast();
      return;
    }

    const product = this.getProductDetails();
    if (!product) {
      return;
    }

    const { id, name, type, color, price, imageUrl } = product as Product & { imageUrl: string };
    this.cartServices.addItem({
      id,
      name,
      type,
      color,
      price,
      imageUrl,
      userId: this.authServices.getCurrentUser().id,
      cartItemId: this.uuid,
    });
  }

  setIsDescriptionOpen() {
    this.isDescriptionOpen = !this.isDescriptionOpen;
  }
  setIsDeliveryAndReturnsOpen() {
    this.isDeliveryAndReturnsOpen = !this.isDeliveryAndReturnsOpen;
  }
}
