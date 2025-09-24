import { Component } from '@angular/core';
import { ShopLayout } from '@Shared/components/layout/shop-layout/shop-layout';
import { PaymentForm } from '../components/payment-form/payment-form';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.html',
  standalone: true,
  imports: [ShopLayout, PaymentForm],
})
export class PaymentPage {}
