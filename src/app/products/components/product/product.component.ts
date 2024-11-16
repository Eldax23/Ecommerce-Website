import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() prd!: Product;
  @Output() addToCart = new EventEmitter();
  amount: number = 0;
  addButton = false;
  onAddToCart() {
    this.addToCart.emit({ item: this.prd, quantity: this.amount });
  }
}
