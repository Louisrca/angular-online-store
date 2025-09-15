import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopServices } from '../../services/shop.services';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';
import { NgIcon } from '@ng-icons/core';
import { hugeArrowRight01, hugeArrowDown01 } from '@ng-icons/huge-icons';
import { provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  imports: [...TRANSLATE_IMPORTS, NgIcon],
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
  isDescriptionOpen = false;
  isDeliveryAndReturnsOpen = false;
  hugeArrowDown01 = 'hugeArrowDown01';
  hugeArrowRight01 = 'hugeArrowRight01';

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
  }

  getProductDetails() {
    return this.shopServices.getProductById(this.productId);
  }

  setIsDescriptionOpen() {
    this.isDescriptionOpen = !this.isDescriptionOpen;
  }
  setIsDeliveryAndReturnsOpen() {
    this.isDeliveryAndReturnsOpen = !this.isDeliveryAndReturnsOpen;
  }
}
