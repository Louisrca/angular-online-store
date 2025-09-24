import { Component, computed, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogServices } from '@Core/services/catalog/catalog.services';
import { OrdersService } from '@Core/services/orders/orders.services';
import { SalesService } from '@Core/services/sales/sales.services';
import { AuthServices } from '@Features/auth/services/auth';
import { CartItem } from '@Features/cart/models/cart.model';
import { CartServices } from '@Features/cart/services/cart.services';
import {
  cardNumberValidator,
  cvvValidator,
  expirationDateValidator,
} from '@Features/payment/utils/card-form-validator';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { InputComponent } from '@Shared/components/design-system/input/input';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';
import { ulid } from 'ulid';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.html',
  standalone: true,
  imports: [...TRANSLATE_IMPORTS, InputComponent, ReactiveFormsModule],
})
export class PaymentForm extends BaseComponent {
  private cartService = inject(CartServices);
  private salesServices = inject(SalesService);
  private ordersServices = inject(OrdersService);
  private catalogServices = inject(CatalogServices);
  authServices = inject(AuthServices);
  private cartServices = inject(CartServices);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  purchaseForm: FormGroup;

  products = this.cartService.cart;
  total = this.cartService.cart().reduce((acc, item) => acc + item.price, 0);
  inputId = `custom-input-${Math.random().toString(36).substring(2, 9)}`;

  orderId = ulid();
  salesId = uuidv4;
  uuid = uuidv4;

  constructor() {
    super();
    this.purchaseForm = this.fb.group({
      nameCard: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required, cardNumberValidator()]),
      expiration: new FormControl('', [Validators.required, expirationDateValidator()]),
      cvv: new FormControl('', [Validators.required, cvvValidator()]),
    });
  }

  nameCardHasError(): boolean {
    const control = this.purchaseForm.get('nameCard');
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  nameCardErrorMessage(): string {
    const control = this.purchaseForm.get('nameCard');
    if (!control || !control.errors) return '';
    if (control.errors['required']) return 'Name on card is required';
    return 'Invalid field';
  }

  numberHasError(): boolean {
    const control = this.purchaseForm.get('number');
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  numberErrorMessage(): string {
    const control = this.purchaseForm.get('number');
    if (!control || !control.errors) return '';
    if (control.errors['required']) return 'Card number is required';
    if (control.errors['invalidCardNumber']) return 'Invalid card number';
    return 'Invalid field';
  }

  expirationHasError(): boolean {
    const control = this.purchaseForm.get('expiration');
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  expirationErrorMessage(): string {
    const control = this.purchaseForm.get('expiration');
    if (!control || !control.errors) return '';
    if (control.errors['required']) return 'Expiration date is required';
    if (control.errors['invalidExpiration']) return 'Invalid expiration date';
    if (control.errors['expired']) return 'Card expired';
    return 'Invalid field';
  }

  cvvHasError(): boolean {
    const control = this.purchaseForm.get('cvv');
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  cvvErrorMessage(): string {
    const control = this.purchaseForm.get('cvv');
    if (!control || !control.errors) return '';
    if (control.errors['required']) return 'CVC is required';
    if (control.errors['invalidCvv']) return 'Invalid CVC';
    return 'Invalid field';
  }

  cartItems = computed<CartItem[]>(() =>
    this.cartServices.getItemsByUser(this.authServices.getCurrentUser().id),
  );

  totalAmount = computed<number>(() =>
    this.cartItems().reduce((total, item) => total + Number(item.price), 0),
  );
  getItemQuantity(item: CartItem): number {
    return this.cartItems().filter((i) => i.id === item.id).length;
  }

  buy() {
    if (this.purchaseForm.invalid) {
      this.purchaseForm.markAllAsTouched();
      return;
    }

    this.salesServices.postSales({
      id: this.salesId(),
      date: new Date(),
      amount: this.totalAmount(),
      items: this.cartItems().map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
      })),
      saleType: 'sale',
    });

    this.catalogServices.updateProductQuantities(
      this.cartItems().map((item) => ({
        id: item.id,
        quantity: this.getItemQuantity(item),
      })),
    );

    this.ordersServices.postOrder({
      id: `ORDER_${this.orderId}`,
      customerId: this.authServices.getCurrentUser().id,
      customerName: this.authServices.getCurrentUser().name,
      customerEmail: this.authServices.getCurrentUser().email,
      customerAddress: '123 Main St, City, Country',
      date: new Date(),
      items: this.cartItems().map((item) => ({
        productId: item.id,
        productName: item.name,
        price: item.price,
        quantity: this.getItemQuantity(item),
        userId: item.userId,
      })),
      amount: this.totalAmount(),
      type: 'purchase',
    });
    this.cartServices.clearCart(this.authServices.getCurrentUser().id);
    this.router.navigate(['/']);
  }
}
