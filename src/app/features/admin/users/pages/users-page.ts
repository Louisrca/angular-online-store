import { Component } from '@angular/core';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';
import { provideIcons } from '@ng-icons/core';
import { hugeUserMinus01 } from '@ng-icons/huge-icons';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.html',
  imports: [RouterOutlet, RouterLink, ...TRANSLATE_IMPORTS],
  viewProviders: [provideIcons({ hugeUserMinus01 })],
})
export class UsersPage extends BaseComponent {}
