import { Component, Input } from '@angular/core';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.html',
  standalone: true,
  imports: [...TRANSLATE_IMPORTS, NgIcon],
})
export class CardInfo extends BaseComponent {
  @Input() title = 'Card Title';
  @Input() subtitle = 'Card Subtitle';
  @Input() content = '6590 €';
  @Input() iconName = 'fa-solid fa-credit-card';
  @Input() iconColor = '#000000';
}
