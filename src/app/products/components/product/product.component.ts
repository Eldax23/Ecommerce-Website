import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() prd: any;
  @Output() addToCart = new EventEmitter();

  onAddToCart() {
    this.addToCart.emit(this.prd);
  }
}
