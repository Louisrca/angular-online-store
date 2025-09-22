import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.html',
  imports: [RouterOutlet, RouterLink, ...TRANSLATE_IMPORTS],
})
export class CatalogPage extends BaseComponent implements OnInit {
  router = inject(ActivatedRoute);

  ngOnInit() {
    return this.router.children;
  }
}
