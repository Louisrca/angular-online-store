import { Component } from '@angular/core';
import { BaseComponent } from '../base-translate/base-translate';
import { provideIcons } from '@ng-icons/core';
import { hugeShoppingBag02, hugeUser } from '@ng-icons/huge-icons';
import { IconLayout } from '../icon-layout/icon-layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [IconLayout],
  viewProviders: [provideIcons({ hugeShoppingBag02, hugeUser })],
})
export class Header extends BaseComponent {
  hugeShoppingBag02 = 'hugeShoppingBag02';
  hugeUser = 'hugeUser';

  changeLanguage(lang: string) {
    this.switchLang(lang);
  }
}
