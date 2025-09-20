import { Injectable } from '@angular/core';
import { Product } from '../models/products.model';
import { Products } from '../../../infrastructures/mocks/products';

@Injectable({
  providedIn: 'root',
})
export class ShopServices {
  getProducts(limit: number): Product[] {
    return Products.slice(0, limit);
  }
  getProductById(id: string): Product | undefined {
    return Products.find((product) => product.id === id);
  }

  getProductLength(): number {
    return Products.length;
  }
}
