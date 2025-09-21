import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { CartDetails } from '../../design-system/cart-details/cart-details';
import { BadgeValuePipe } from '../../../pipes/badge-value/badge-value.pipe';

@Component({
  selector: 'app-icon-layout',
  templateUrl: './icon-layout.html',
  imports: [NgIcon, RouterLink, CartDetails, BadgeValuePipe],
})
export class IconLayout {
  @Input() iconName!: string;
  @Input() route!: string;
  @Input() isBadgeVisible = false;
  @Input() itemQuantity = 0;
  @Input() isModalVisible = false;
  @Input() hasModal = false;

  toggleModal() {
    if (this.hasModal) {
      this.isModalVisible = !this.isModalVisible;
    }
  }
}
