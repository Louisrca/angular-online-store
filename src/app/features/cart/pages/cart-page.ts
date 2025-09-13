import { Component } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../shared/imports/translate-imports';
import { ShopLayout } from '../../../shared/components/layout/shop-layout/shop-layout';

@Component({
  selector: 'app-cart-page',
  imports: [...TRANSLATE_IMPORTS, ShopLayout],
  templateUrl: './cart-page.html',
})
export class CartPage extends BaseComponent {}
