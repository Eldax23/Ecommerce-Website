import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../products/services/products.service';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartProducts: any = [];
  total = 0;
  orderSuccess: boolean = false;
  constructor(
    private productsService: ProductsService,
    private cartsService: CartsService
  ) {}
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    if (localStorage.getItem('cart')) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      console.log(this.cartProducts);
    }
    this.calculateTotal();
  }

  updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  calculateSubtotal(prd: any, quantity: number) {
    return prd.price * quantity;
  }

  calculateTotal() {
    this.total = 0;
    this.cartProducts.map((c: any) => {
      this.total += c.item.price * c.quantity;
    });
  }

  addAmount(index: number) {
    let selectedPrd = this.cartProducts[index];
    selectedPrd.quantity++;
    this.updateLocalStorage();
    this.calculateTotal();
  }

  minusAmount(index: number) {
    let selectedPrd = this.cartProducts[index];
    selectedPrd.quantity--;
    this.updateLocalStorage();

    this.calculateTotal();
  }
  detectChange() {
    this.updateLocalStorage();
    console.log('quantity changed');
    this.calculateTotal();
  }
  deleteProduct(index: number) {
    // console.log(name);
    // this.cartProducts = this.cartProducts.filter(
    //   (p: any) => p.item.title != name
    // );
    this.cartProducts.splice(index, 1);
    console.log(this.cartProducts);
    this.updateLocalStorage();
    this.loadProducts();
  }

  clearCart() {
    this.cartProducts = [];
    this.updateLocalStorage();
    this.loadProducts();
  }

  addCart() {
    let productsBody = this.cartProducts.map((p: any) => {
      return { productId: p.item.id, quantity: p.quantity };
    });
    const reqBody = {
      userId: 5,
      date: new Date(),
      products: productsBody,
    };
    console.log(reqBody);
    this.cartsService.addCart(reqBody).subscribe(
      (res) => {
        this.orderSuccess = true;
        console.log(res);
      },
      (err) => {
        console.log(`Error Occured: ${err}`);
      }
    );
  }
}
