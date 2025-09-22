import { Component, inject, OnInit } from '@angular/core';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { AuthServices } from '@Features/auth/services/auth';
import productField from '@Assets/i18n/en.json';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ShopServices } from '@Features/shop/services/shop.services';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { hugeImage02 } from '@ng-icons/huge-icons';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.html',
  imports: [...TRANSLATE_IMPORTS, FormsModule, ReactiveFormsModule, ToastModule, NgIcon],
  viewProviders: [provideIcons({ hugeImage02 })],
  providers: [MessageService],
})
export class AddProduct extends BaseComponent implements OnInit {
  private fb = inject(FormBuilder);
  shopService = inject(ShopServices);
  messageService = inject(MessageService);

  authService = inject(AuthServices);
  productField = productField;
  productForm: FormGroup;

  hugeImage02 = 'hugeImage02';

  currentUser = this.authService.getCurrentUser();

  ngOnInit() {
    this.productForm.get('type')?.valueChanges.subscribe((type) => {
      if (type === 'product.type.shoes') {
        this.productForm.get('availabledSize')?.setValue(['39', '40', '41', '42', '43']);
      } else {
        this.productForm.get('availabledSize')?.setValue(['XS', 'S', 'M', 'L', 'XL']);
      }
    });
  }

  constructor() {
    super();
    this.productForm = this.fb.group({
      type: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      subName: new FormControl(''),
      color: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      description: new FormControl({
        composition: '100% Polyester',
        care: 'Machine wash cold, tumble dry low',
        origin: 'Made in Vietnam',
        fit: 'Regular fit',
        productSize: 'M',
        modelHeight: '6ft 1in (185 cm)',
      }),
      imageUrl: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      availabledSize: new FormControl([], [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  getImageUrl() {
    if (this.productForm.get('imageUrl')?.value) {
      return this.productForm.get('imageUrl')?.value;
    }
    return '';
  }

  getProductTypedKeys() {
    const productTypedKeys = Object.keys(productField.product.type);
    return productTypedKeys;
  }

  getProductGenderKeys() {
    const productGenderKeys = Object.keys(productField.product.gender);
    return productGenderKeys;
  }

  getProductColorKeys() {
    const productColorKeys = Object.keys(productField.product.color);
    return productColorKeys;
  }

  showAddProductToast() {
    this.messageService.add({
      severity: 'info',
      detail: 'productElement.toast.productAdded',
      life: 3000,
      styleClass: 'custom-toast',
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      console.log('Form is invalid');
      return;
    }
    this.showAddProductToast();
    this.shopService.addProduct(this.productForm.value);
    this.productForm.reset();
  }
}
