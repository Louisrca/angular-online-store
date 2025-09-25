import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CatalogServices } from '@Core/services/catalog/catalog.services';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';
import { NgIcon } from '@ng-icons/core';
import { hugeArrowRight01, hugeArrowDown01 } from '@ng-icons/huge-icons';
import { provideIcons } from '@ng-icons/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthServices } from '../../../auth/services/auth';
import { CartServices } from '../../../cart/services/cart.services';
import { v4 as uuidv4 } from 'uuid';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  host: { hostID: crypto.randomUUID().toString() },
  imports: [...TRANSLATE_IMPORTS, NgIcon, ToastModule, RouterLink, ReactiveFormsModule],
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

  catalogServices = inject(CatalogServices);
  route = inject(ActivatedRoute);
  authServices = inject(AuthServices);
  cartServices = inject(CartServices);
  isDescriptionOpen = false;
  isDeliveryAndReturnsOpen = false;
  hugeArrowDown01 = 'hugeArrowDown01';
  hugeArrowRight01 = 'hugeArrowRight01';
  productForm: FormGroup;
  private fb = inject(FormBuilder);
  uuid = uuidv4;
  messageService = inject(MessageService);

  selectedSizeError = false;
  selectedSizeErrorMessage = '';

  constructor() {
    super();
    this.productForm = this.fb.group({
      size: ['', Validators.required],
    });
  }

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
    return this.catalogServices.getProductById(this.productId);
  }
  addToCart() {
    if (!this.authServices.isLoggedIn()) {
      this.showAuthToast();
      return;
    }

    if (this.productForm.invalid) {
      this.selectedSizeError = true;
      this.selectedSizeErrorMessage = 'requis';
      return;
    }

    const product = this.getProductDetails();
    if (product === undefined) {
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
      selectedSize: this.productForm.value.size,
      userId: this.authServices.getCurrentUser().id,
      cartItemId: this.uuid(),
    });
  }

  setIsDescriptionOpen() {
    this.isDescriptionOpen = !this.isDescriptionOpen;
  }
  setIsDeliveryAndReturnsOpen() {
    this.isDeliveryAndReturnsOpen = !this.isDeliveryAndReturnsOpen;
  }
}
