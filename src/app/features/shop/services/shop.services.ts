import { Injectable } from '@angular/core';
import { Product } from '../models/products.model';
import { Products } from '../../../infrastructures/mocks/produts';

@Injectable({
  providedIn: 'root',
})
export class ShopServices {
  getProducts(): Product[] {
    return Products;
  }
}
