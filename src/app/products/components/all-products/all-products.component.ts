import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
        console.log(res);
      },
      (error: Error) => {
        alert(error.message);
      }
    );
  }

  getCategories() {
    this.productsService.getAllCategories().subscribe((res: any) => {
      console.log(res);
      this.categories = res;
    });
  }

  filterCategory(event: any) {
    let value = event.target.value;

    console.log(value);
    value == 'all' ? this.getProducts() : this.getProductsCategory(value);
  }

  getProductsCategory(value: string) {
    this.productsService.getProductsByCategory(value).subscribe((res: any) => {
      this.products = res;
    });
  }
}
