import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { hugeAdd01 } from '@ng-icons/huge-icons';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.html',
  imports: [RouterOutlet, RouterLink, ...TRANSLATE_IMPORTS, NgIcon],
  viewProviders: [provideIcons({ hugeAdd01 })],
})
export class CatalogPage extends BaseComponent implements OnInit {
  router = inject(ActivatedRoute);
  hugeAdd01 = 'hugeAdd01';

  ngOnInit() {
    return this.router.children;
  }
}
