import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TRANSLATE_IMPORTS } from '../../imports/translate-imports';

@Component({
  template: '',
  standalone: true,
  imports: [...TRANSLATE_IMPORTS],
})
export class BaseComponent {
  private translate = inject(TranslateService);

  constructor() {
    if (this.translate.getLangs().length === 0) {
      this.translate.addLangs(['en', 'fr']);
      this.translate.setFallbackLang('en');
      this.translate.use('en');
    }
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
