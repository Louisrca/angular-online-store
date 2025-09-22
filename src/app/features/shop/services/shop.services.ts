import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/products.model';
import { Products } from '../../../infrastructures/mocks/products';

@Injectable({
  providedIn: 'root',
})
export class ShopServices {
  private products = signal<Product[]>([]);

  constructor() {
    const stored = localStorage.getItem('products');
    if (stored) {
      this.products.set(JSON.parse(stored));
    } else {
      localStorage.setItem('products', JSON.stringify(Products));
      this.products.set(Products);
    }
  }

  private saveProducts(products: Product[]): void {
    localStorage.setItem('products', JSON.stringify(products));
    this.products.set(products);
  }

  allProducts = computed(() => this.products());

  productsByFilter = (limit: number, typeFilter?: string) =>
    computed(() => {
      let products = this.products();

      if (typeFilter) {
        switch (typeFilter) {
          case 'men':
            products = products.filter(
              (p) =>
                (p.gender === 'product.gender.male' || p.gender === 'product.gender.unisex') &&
                p.type !== 'product.type.shoes',
            );
            break;
          case 'women':
            products = products.filter(
              (p) =>
                (p.gender === 'product.gender.female' || p.gender === 'product.gender.unisex') &&
                p.type !== 'product.type.shoes',
            );
            break;
          case 'sneakers':
            products = products.filter((p) => p.type === 'product.type.shoes');
            break;
        }
      }

      return products.slice(0, limit);
    });

  productsLength = (typeFilter?: string) =>
    computed(() => {
      let products = this.products();
      if (typeFilter) {
        switch (typeFilter) {
          case 'men':
            products = products.filter(
              (p) =>
                (p.gender === 'product.gender.male' || p.gender === 'product.gender.unisex') &&
                p.type !== 'product.type.shoes',
            );
            break;
          case 'women':
            products = products.filter(
              (p) =>
                (p.gender === 'product.gender.female' || p.gender === 'product.gender.unisex') &&
                p.type !== 'product.type.shoes',
            );
            break;
          case 'sneakers':
            products = products.filter((p) => p.type === 'product.type.shoes');
            break;
        }
      }
      return products.length;
    });

  getProductById(id: string): Product | undefined {
    return this.products().find((p) => p.id === id);
  }

  addProduct(product: Product): void {
    const updated = [...this.products(), { ...product, id: crypto.randomUUID() }];
    this.saveProducts(updated);
  }
  removeProduct(id: string): void {
    const updated = this.products().filter((p) => p.id !== id);
    this.saveProducts(updated);
  }
}
