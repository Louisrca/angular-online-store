import { Component } from '@angular/core';
import { TranslateButtons } from '../design-system/translate-buttons/translate-buttons';
import { RouterLink } from '@angular/router';
import { BaseComponent } from '../base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../imports/translate-imports';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.html',
  imports: [RouterLink, TranslateButtons, ...TRANSLATE_IMPORTS],
})
export class AuthHeader extends BaseComponent {}
