import { Injectable } from '@angular/core';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ShopServices {
  products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 100,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 200,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for Product 3',
      price: 300,
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
