import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../imports/translate-imports';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-translate-buttons',
  templateUrl: './translate-buttons.html',
  imports: [...TRANSLATE_IMPORTS, NgClass],
})
export class TranslateButtons extends BaseComponent implements OnInit {
  @Input() direction: 'row' | 'col' = 'row';

  ngOnInit() {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.switchLang(savedLang);
  }

  changeLanguage(lang: 'en' | 'fr') {
    localStorage.setItem('lang', lang);
    this.switchLang(lang);
  }
}
