import { Component, inject, OnInit } from '@angular/core';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { RouterLink } from '@angular/router';
import { AuthServices } from '../../../auth/services/auth';
import productField from '../../../../../assets/i18n/en.json';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ShopServices } from '../../../shop/services/shop.services';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { hugeImage02 } from '@ng-icons/huge-icons';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.html',
  imports: [...TRANSLATE_IMPORTS, RouterLink, FormsModule, ReactiveFormsModule, NgIcon],
  viewProviders: [provideIcons({ hugeImage02 })],
})
export class CatalogPage extends BaseComponent implements OnInit {
  private fb = inject(FormBuilder);
  shopService = inject(ShopServices);

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

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.shopService.addProduct(this.productForm.value);
    this.productForm.reset();
  }
}
