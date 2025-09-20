import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { hugeInstagram, hugeNewTwitterRectangle, hugeYoutube } from '@ng-icons/huge-icons';
import { BaseComponent } from '../../base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../imports/translate-imports';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  imports: [NgIcon, ...TRANSLATE_IMPORTS],
  viewProviders: [provideIcons({ hugeInstagram, hugeNewTwitterRectangle, hugeYoutube })],
})
export class Footer extends BaseComponent {
  currentYear: number = new Date().getFullYear();
  hugeInstagram = 'hugeInstagram';
  hugeNewTwitterRectangle = 'hugeNewTwitterRectangle';
  hugeYoutube = 'hugeYoutube';
}
