import { NgClass } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
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
  imports: [...TRANSLATE_IMPORTS, InputComponent, ReactiveFormsModule, NgClass],
})
export class PaymentForm extends BaseComponent implements OnInit {
  private cartService = inject(CartServices);
  private salesServices = inject(SalesService);
  private ordersServices = inject(OrdersService);
  private catalogServices = inject(CatalogServices);
  authServices = inject(AuthServices);
  private cartServices = inject(CartServices);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  purchaseForm: FormGroup;
  deliveryOptionForm: FormGroup;

  standardDeliveryCost = 0;
  premiumDeliveryCost = 9.99;

  get deliveryCost(): number {
    return this.deliveryOptionForm.get('deliveryOption')?.value === 'premium'
      ? this.premiumDeliveryCost
      : this.standardDeliveryCost;
  }

  products = this.cartService.cart;
  total = this.cartService.cart().reduce((acc, item) => acc + item.price, 0);
  inputId = `custom-input-${Math.random().toString(36).substring(2, 9)}`;

  orderId = ulid();
  salesId = uuidv4;
  uuid = uuidv4;

  isLoading = false;
  globalErrorMessage = '';

  ngOnInit(): void {
    if (this.cartItems().length <= 0) {
      this.router.navigate(['/cart']);
    }
  }

  constructor() {
    super();
    this.purchaseForm = this.fb.group({
      nameCard: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required, cardNumberValidator()]),
      expiration: new FormControl('', [Validators.required, expirationDateValidator()]),
      cvv: new FormControl('', [Validators.required, cvvValidator()]),
    });

    this.deliveryOptionForm = this.fb.group({
      deliveryOption: new FormControl('standard', [Validators.required]),
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

    this.isLoading = true;
    this.globalErrorMessage = '';

    setTimeout(() => {
      try {
        this.salesServices.postSales({
          id: this.salesId(),
          date: new Date(),
          amount: this.totalAmount() + this.deliveryCost + this.totalAmount() * 0.2,
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
          date: new Date(),
          user: {
            id: this.authServices.getCurrentUser().id,
            firstName: this.authServices.getCurrentUser().firstName,
            lastName: this.authServices.getCurrentUser().lastName,
            email: this.authServices.getCurrentUser().email,
            street: this.authServices.getCurrentUser().street,
            phone: this.authServices.getCurrentUser().phone,
            city: this.authServices.getCurrentUser().city,
            country: this.authServices.getCurrentUser().country,
            role: this.authServices.getCurrentUser().role,
          },
          items: this.cartItems().map((item) => ({
            productId: item.id,
            productName: item.name,
            price: item.price,
            productImgUrl: item.imageUrl,
            productSize: item.selectedSize,
            quantity: this.getItemQuantity(item),
            userId: item.userId,
          })),
          amount: this.totalAmount() + this.deliveryCost + this.totalAmount() * 0.2,
          type: 'purchase',
        });
        this.cartServices.clearCart(this.authServices.getCurrentUser().id);
        this.router.navigate(['/billing'], { queryParams: { orderId: `ORDER_${this.orderId}` } });
      } catch (err) {
        this.globalErrorMessage = 'An error occurred during payment.';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    }, 2000);
  }
}
