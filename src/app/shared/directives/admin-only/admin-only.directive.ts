import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthServices } from '../../../features/auth/services/auth';

@Directive({
  selector: '[appAdminOnly]',
  standalone: true,
})
export class AdminOnlyDirective {
  private authService = inject(AuthServices);
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef);
  constructor() {
    this.updateView();
  }

  private updateView() {
    if (this.authService.isWorker()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
