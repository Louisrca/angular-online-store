import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthServices } from '../../../features/auth/services/auth';
import { CartServices } from '../../../features/cart/services/cart.services';

@Directive({
  selector: '[appEmptyCart]',
  standalone: true,
})
export class EmptyCartDirective {
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<unknown>);
  private authService = inject(AuthServices);
  private cartService = inject(CartServices);
  constructor() {
    this.updateView();
  }
  updateView() {
    const cartItems = this.cartService.getItemsByUser(this.authService.getCurrentUser().id);
    if (cartItems.length === 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
