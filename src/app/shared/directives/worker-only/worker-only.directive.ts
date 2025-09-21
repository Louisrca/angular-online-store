import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthServices } from '../../../features/auth/services/auth';

@Directive({
  selector: '[appWorkerOnly]',
  standalone: true,
})
export class WorkerOnlyDirective {
  private authService = inject(AuthServices);
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<unknown>);
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
