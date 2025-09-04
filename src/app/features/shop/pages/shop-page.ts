import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsList } from '../components/products-list/products-list';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.html',
  imports: [RouterOutlet, ProductsList],
})
export class ShopPage {}
