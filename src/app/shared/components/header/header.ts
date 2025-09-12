import { Component } from '@angular/core';
import { BaseComponent } from '../base-translate/base-translate';
import { provideIcons } from '@ng-icons/core';
import { hugeShoppingBag02, hugeUser } from '@ng-icons/huge-icons';
import { IconLayout } from '../icon-layout/icon-layout';
import { TranslateButtons } from '../translate-buttons/translate-buttons';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [IconLayout, TranslateButtons],
  viewProviders: [provideIcons({ hugeShoppingBag02, hugeUser })],
})
export class Header extends BaseComponent {
  hugeShoppingBag02 = 'hugeShoppingBag02';
  hugeUser = 'hugeUser';
}
