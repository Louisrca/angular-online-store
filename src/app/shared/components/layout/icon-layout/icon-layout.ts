import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-icon-layout',
  templateUrl: './icon-layout.html',
  imports: [NgIcon, RouterLink],
})
export class IconLayout {
  @Input() iconName!: string;
  @Input() route!: string;
}
