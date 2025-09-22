import { Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartServices {
  private items = signal<CartItem[]>([]);

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const cart = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
    this.items.set(cart);
  }

  get cart() {
    return this.items.asReadonly();
  }

  addItem(item: CartItem) {
    const updated = [...this.items(), item];
    this.items.set(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  }

  removeItem(item: CartItem) {
    const updated = this.items().filter(
      (i) => !(i.cartItemId === item.cartItemId && i.userId === item.userId),
    );
    this.items.set(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  }

  getItemsByUser(userId: string): CartItem[] {
    return this.items().filter((item) => item.userId === userId);
  }

  clearCart(userId: string) {
    const updated = this.items().filter((item) => item.userId !== userId);
    this.items.set(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  }
}
