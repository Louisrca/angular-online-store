import { Component } from '@angular/core';
import { BaseComponent } from '../../base-translate/base-translate';
import { Header } from '../../header/header';

@Component({
  selector: 'app-shop-layout',
  templateUrl: './shop-layout.html',
  imports: [Header],
})
export class ShopLayout extends BaseComponent {}
