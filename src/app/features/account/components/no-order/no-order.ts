import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BaseComponent } from '@Shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '@Shared/imports/translate-imports';

@Component({
  selector: 'app-no-order',
  templateUrl: './no-order.html',
  standalone: true,
  imports: [RouterLink, ...TRANSLATE_IMPORTS],
})
export class NoOrder extends BaseComponent {}
