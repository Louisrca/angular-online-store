import { Injectable } from '@angular/core';
import { Product } from '../models/products.model';
import { Products } from '../../../infrastructures/mocks/products';

@Injectable({
  providedIn: 'root',
})
export class ShopServices {
  getProducts(limit: number, typeFilter?: string): Product[] {
    let filtered = Products;

    if (typeFilter) {
      switch (typeFilter) {
        case 'men':
          filtered = Products.filter((p) => p.gender === 'product.gender.male');
          break;
        case 'women':
          filtered = Products.filter((p) => p.gender === 'product.gender.female');
          break;
        case 'sneakers':
          filtered = Products.filter((p) => p.type === 'product.type.shoes');
          break;
        default:
          filtered = Products;
      }
    }

    return filtered.slice(0, limit);
  }
  getProductById(id: string): Product | undefined {
    return Products.find((product) => product.id === id);
  }

  getProductLength(typeFilter?: string): number {
    let filtered = Products;

    if (typeFilter) {
      switch (typeFilter) {
        case 'men':
          filtered = Products.filter((p) => p.gender === 'product.gender.male');
          break;
        case 'women':
          filtered = Products.filter((p) => p.gender === 'product.gender.female');
          break;
        case 'sneakers':
          filtered = Products.filter((p) => p.type === 'product.type.shoes');
          break;
        default:
          filtered = Products;
      }
    }

    return filtered.length;
  }
}
