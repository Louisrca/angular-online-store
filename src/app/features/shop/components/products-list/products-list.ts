import { Component, inject } from '@angular/core';
import { ShopServices } from '../../services/shop.services';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
  imports: [TranslatePipe],
})
export class ProductsList {
  productsServices = inject(ShopServices);
  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setFallbackLang('en');
    this.translate.use('en');
  }

  products = this.productsServices.getProducts();
}
