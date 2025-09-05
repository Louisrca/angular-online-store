import { Component } from '@angular/core';
import { BaseComponent } from '../base-translate/base-translate';
import { Header } from '../header/header';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  imports: [Header],
})
export class Layout extends BaseComponent {}
