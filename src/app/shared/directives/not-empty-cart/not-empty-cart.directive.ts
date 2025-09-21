import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { CartServices } from '../../../features/cart/services/cart.services';
import { AuthServices } from '../../../features/auth/services/auth';

@Directive({
  selector: '[appNotEmptyCart]',
  standalone: true,
})
export class NotEmptyCartDirective {
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<unknown>);
  private authService = inject(AuthServices);
  private cartService = inject(CartServices);
  constructor() {
    this.updateView();
  }
  updateView() {
    const cartItems = this.cartService.getItemsByUser(this.authService.getCurrentUser().id);
    if (cartItems.length > 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
