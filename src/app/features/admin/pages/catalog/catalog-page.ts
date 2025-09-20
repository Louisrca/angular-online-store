import { Component, inject } from '@angular/core';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { RouterLink } from '@angular/router';
import { AuthServices } from '../../../auth/services/auth';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.html',
  imports: [...TRANSLATE_IMPORTS, RouterLink],
})
export class CatalogPage extends BaseComponent {
  authService = inject(AuthServices);

  currentUser = this.authService.getCurrentUser();
}
