import { Component } from '@angular/core';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.html',
  imports: [...TRANSLATE_IMPORTS, RouterLink],
})
export class UsersPage extends BaseComponent {}
