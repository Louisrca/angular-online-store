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

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  imports: [RouterLink, ...TRANSLATE_IMPORTS, NgIcon, ToastModule],
  viewProviders: [
    provideIcons({
      hugeArrowRight01,
      hugeArrowDown01,
    }),
  ],
  providers: [MessageService],
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

  messageService = inject(MessageService);

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
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
    });
  }

  setIsDescriptionOpen() {
    this.isDescriptionOpen = !this.isDescriptionOpen;
  }
  setIsDeliveryAndReturnsOpen() {
    this.isDeliveryAndReturnsOpen = !this.isDeliveryAndReturnsOpen;
  }
}
