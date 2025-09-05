import { Component } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../shared/imports/translate-imports';
import { Layout } from '../../../shared/components/layout/layout';

@Component({
  selector: 'app-cart-page',
  imports: [...TRANSLATE_IMPORTS, Layout],
  templateUrl: './cart-page.html',
})
export class CartPage extends BaseComponent {}
