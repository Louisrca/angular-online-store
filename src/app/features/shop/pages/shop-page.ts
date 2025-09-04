import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsList } from '../components/products-list/products-list';
import { BaseComponent } from '../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../shared/imports/translate-imports';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.html',
  imports: [...TRANSLATE_IMPORTS, RouterOutlet, ProductsList],
})
export class ShopPage extends BaseComponent {
  name = 'Louis';

  changeLanguage(lang: string) {
    this.switchLang(lang);
  }
}
