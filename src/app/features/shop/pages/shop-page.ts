import { Component } from '@angular/core';
import { ProductsList } from '../components/products-list/products-list';
import { BaseComponent } from '../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../shared/imports/translate-imports';
import { ShopLayout } from '../../../shared/components/layout/shop-layout/shop-layout';
import { Carousel } from '../../../shared/components/carousel/carousel';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.html',
  imports: [...TRANSLATE_IMPORTS, ProductsList, ShopLayout, Carousel],
})
export class ShopPage extends BaseComponent {}
