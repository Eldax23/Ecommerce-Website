import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.scss',
})
export class ProductsDetailsComponent implements OnInit {
  id: any = -1;
  prd: any;
  loading = false;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getProduct();
  }

  getProduct() {
    this.loading = true;
    this.productsService.getProductById(this.id).subscribe((res) => {
      this.prd = res;
      this.loading = false;
    });
  }
}
