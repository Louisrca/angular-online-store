import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { CartDetails } from '../../design-system/cart-details/cart-details';

@Component({
  selector: 'app-icon-layout',
  templateUrl: './icon-layout.html',
  imports: [NgIcon, RouterLink, CartDetails],
})
export class IconLayout {
  @Input() iconName!: string;
  @Input() route!: string;
  @Input() isBadgeVisible = false;
  @Input() itemQuantity: number | string = 0;
  @Input() isModalVisible = false;
  @Input() hasModal = false;

  toggleModal() {
    if (this.hasModal) {
      this.isModalVisible = !this.isModalVisible;
    }
  }
}
