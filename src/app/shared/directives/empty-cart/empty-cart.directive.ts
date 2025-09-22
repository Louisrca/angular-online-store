import { Directive, inject, TemplateRef, ViewContainerRef, effect } from '@angular/core';
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
    effect(() => {
      const userId = this.authService.getCurrentUser()?.id;
      // ⚡ lire le signal directement
      const cartItems = userId
        ? this.cartService.cart().filter((item) => item.userId === userId)
        : [];

      this.viewContainer.clear();
      if (cartItems.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
