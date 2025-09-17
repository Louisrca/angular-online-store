import { Injectable } from '@angular/core';
import { CART_ITEM } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartServices {
  private items: CART_ITEM[] = [];

  addItem(item: CART_ITEM) {
    const items = localStorage.getItem('cartItems');
    if (items) {
      this.items = JSON.parse(items);
    }
    this.items.push(item);
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  removeItem(item: CART_ITEM) {
    const index = localStorage.getItem('cartItems')?.indexOf(JSON.stringify(item)) as number;
    if (index > -1) {
      this.items.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.items));
    }
  }

  getItems() {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem('cartItems');
  }
}
