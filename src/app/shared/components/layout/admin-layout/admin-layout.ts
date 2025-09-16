import { Component } from '@angular/core';
import { AdminNav } from '../../admin-nav/admin-nav';
import { RouterOutlet } from '@angular/router';
import { BaseComponent } from '../../base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../imports/translate-imports';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.html',
  imports: [AdminNav, RouterOutlet, ...TRANSLATE_IMPORTS],
})
export class AdminLayout extends BaseComponent {}
