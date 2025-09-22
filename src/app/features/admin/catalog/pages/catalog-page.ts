import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';
import { provideIcons } from '@ng-icons/core';
import { hugeAdd01 } from '@ng-icons/huge-icons';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.html',
  imports: [RouterOutlet, RouterLink, ...TRANSLATE_IMPORTS],
  viewProviders: [provideIcons({ hugeAdd01 })],
})
export class CatalogPage extends BaseComponent {
  activatedRouter = inject(ActivatedRoute);
  hugeAdd01 = 'hugeAdd01';

  router = inject(Router);

  getPageTitle(): string {
    const url = this.router.url;

    if (url === '/catalog' || url === '/catalog/') {
      return 'admin.catalogPage.mainTitle';
    } else if (url.includes('/catalog/add-product')) {
      return 'admin.catalogPage.addProductTitle';
    } else {
      return 'admin.catalogPage.mainTitle';
    }
  }
}
