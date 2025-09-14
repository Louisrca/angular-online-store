import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthHeader } from '../../../../shared/components/auth-header/auth-header';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';
@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.html',
  imports: [RouterOutlet, RouterModule, AuthHeader, ...TRANSLATE_IMPORTS],
})
export class AuthPage extends BaseComponent {
  isActiveLink = (url: string) => {
    return window.location.pathname === url;
  };
}
