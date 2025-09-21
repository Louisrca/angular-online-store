import { Injectable } from '@angular/core';
import { Product } from '../models/products.model';
import { Products } from '../../../infrastructures/mocks/products';

@Injectable({
  providedIn: 'root',
})
export class ShopServices {
  constructor() {
    if (!localStorage.getItem('products')) {
      localStorage.setItem('products', JSON.stringify(Products));
    }
  }

  private loadProducts(): Product[] {
    return JSON.parse(localStorage.getItem('products') || '[]');
  }

  private saveProducts(products: Product[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }

  getProducts(limit: number, typeFilter?: string): Product[] {
    let products = this.loadProducts();

    if (typeFilter) {
      switch (typeFilter) {
        case 'men':
          products = products.filter(
            (p) => p.gender === 'product.gender.male' || p.gender === 'product.gender.unisex',
          );
          break;
        case 'women':
          products = products.filter(
            (p) => p.gender === 'product.gender.female' || p.gender === 'product.gender.unisex',
          );
          break;
        case 'sneakers':
          products = products.filter(
            (p) => p.type === 'product.type.shoes' || p.gender === 'product.gender.unisex',
          );
          break;
      }
    }

    return products.slice(0, limit);
  }

  getProductById(id: string): Product | undefined {
    return this.loadProducts().find((product) => product.id === id);
  }

  getProductLength(typeFilter?: string): number {
    let products = this.loadProducts();

    if (typeFilter) {
      switch (typeFilter) {
        case 'men':
          products = products.filter(
            (p) => p.gender === 'product.gender.male' || p.gender === 'product.gender.unisex',
          );
          break;
        case 'women':
          products = products.filter(
            (p) => p.gender === 'product.gender.female' || p.gender === 'product.gender.unisex',
          );
          break;
        case 'sneakers':
          products = products.filter(
            (p) => p.type === 'product.type.shoes' || p.gender === 'product.gender.unisex',
          );
          break;
      }
    }

    return products.length;
  }

  addProduct(product: Product): void {
    const products = this.loadProducts();
    products.push({ ...product, id: crypto.randomUUID() });
    this.saveProducts(products);
  }
}
