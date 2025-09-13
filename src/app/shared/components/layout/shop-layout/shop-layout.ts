import { Component } from '@angular/core';
import { BaseComponent } from '../../base-translate/base-translate';
import { Header } from '../../header/header';
import { Footer } from '../../design-system/footer/footer';

@Component({
  selector: 'app-shop-layout',
  templateUrl: './shop-layout.html',
  imports: [Header, Footer],
})
export class ShopLayout extends BaseComponent {}
