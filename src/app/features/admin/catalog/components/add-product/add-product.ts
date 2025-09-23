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
import { CatalogServices } from '@Core/services/catalog/catalog.services';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { hugeArrowLeft01, hugeImage02 } from '@ng-icons/huge-icons';
import { v4 as uuidV4 } from 'uuid';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.html',
  imports: [
    ...TRANSLATE_IMPORTS,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    NgIcon,
    RouterLink,
  ],
  host: { hostID: crypto.randomUUID().toString() },
  viewProviders: [provideIcons({ hugeImage02, hugeArrowLeft01 })],
})
export class AddProduct extends BaseComponent implements OnInit {
  private fb = inject(FormBuilder);
  catalogService = inject(CatalogServices);
  messageService = inject(MessageService);

  uuid = uuidV4;

  authService = inject(AuthServices);
  productField = productField;
  productForm: FormGroup;

  hugeImage02 = 'hugeImage02';
  hugeArrowLeft01 = 'hugeArrowLeft01';

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
      id: this.uuid(),

      severity: 'info',
      detail: 'productElement.toast.productAdded',
      life: 3000,
      styleClass: 'custom-toast',
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.showAddProductToast();
    this.catalogService.addProduct(this.productForm.value);
    this.productForm.reset();
  }
}
