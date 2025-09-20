import { Component } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.html',
  imports: [...TRANSLATE_IMPORTS, RouterLink],
})
export class UsersPage extends BaseComponent {}
