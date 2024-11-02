import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartProducts: any = [];
  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    if (localStorage.getItem('cart')) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      console.log(this.cartProducts);
    }
  }

  calculateSubtotal(prd: any, quantity: number) {
    return prd.price * quantity;
  }
}
