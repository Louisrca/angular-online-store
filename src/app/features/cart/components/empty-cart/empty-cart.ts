import { Component } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.html',
  imports: [...TRANSLATE_IMPORTS, RouterLink],
})
export class EmptyCart extends BaseComponent {}
