import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  cartProducts: any[] = [];
  loading = false;
  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading = true;
    this.productsService.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
        console.log(res);
        this.loading = false;
      },
      (error: Error) => {
        alert(error.message);
        this.loading = false;
      }
    );
  }

  getCategories() {
    this.loading = true;
    this.productsService.getAllCategories().subscribe((res: any) => {
      console.log(res);
      this.loading = false;
      this.categories = res;
    });
  }

  filterCategory(event: any) {
    let value = event.target.value;

    console.log(value);
    value == 'all' ? this.getProducts() : this.getProductsCategory(value);
  }

  getProductsCategory(value: string) {
    this.loading = true;
    this.productsService.getProductsByCategory(value).subscribe((res: any) => {
      this.loading = false;
      this.products = res;
    });
  }

  addToCart(prd: any) {
    console.log(prd);
    if (localStorage.getItem('cart')) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist =
        this.cartProducts.filter((p) => p.item.id == prd.item.id).length > 0;
      if (exist) {
        alert('product already exists');
      } else {
        this.cartProducts.push(prd);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(prd);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
