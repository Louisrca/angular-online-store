import { Injectable, signal, computed } from '@angular/core';
import { Product } from '@Features/shop/models/products.model';
import { Products } from '../../../infrastructures/mocks/products';

@Injectable({
  providedIn: 'root',
})
export class CatalogServices {
  private catalog = signal<Product[]>([]);

  constructor() {
    const stored = localStorage.getItem('products');
    if (stored) {
      this.catalog.set(JSON.parse(stored));
    } else {
      localStorage.setItem('products', JSON.stringify(Products));
      this.catalog.set(Products);
    }
  }

  private saveProducts(products: Product[]): void {
    localStorage.setItem('products', JSON.stringify(products));
    this.catalog.set(products);
  }

  allProducts = computed(() => this.catalog());

  productsByFilter = (limit: number, typeFilter?: string) =>
    computed(() => {
      let products = this.catalog();

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

      return products.filter((p) => (p.quantity ? p.quantity > 0 : false)).slice(0, limit);
    });

  productswithoutQuantityFilter = (limit: number, typeFilter?: string) =>
    computed(() => {
      let products = this.catalog();

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
      let products = this.catalog();
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
    return this.catalog().find((p) => p.id === id);
  }

  addProduct(product: Product): void {
    const updated = [...this.catalog(), { ...product, id: crypto.randomUUID() }];
    this.saveProducts(updated);
  }
  removeProduct(id: string): void {
    const updated = this.catalog().filter((p) => p.id !== id);
    this.saveProducts(updated);
  }

  updateProductQuantities(updates: { id: string; quantity: number }[]): void {
    const updated = this.catalog().map((product) => {
      const update = updates.find((u) => u.id === product.id);

      if (update) {
        return {
          ...product,
          quantity:
            (product.quantity ?? 0) - update.quantity < 0
              ? 0
              : (product.quantity ?? 0) - update.quantity,
        };
      }
      return product;
    });
    this.saveProducts(updated);
  }
}
