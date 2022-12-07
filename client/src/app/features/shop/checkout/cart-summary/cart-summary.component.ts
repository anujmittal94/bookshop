import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/core/models/cart.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
  @Input() items: CartItem[] | null = null;
  @Output() checkoutEvent: EventEmitter<CartItem[]> = new EventEmitter<
    CartItem[]
  >();
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  onSubmit(items: CartItem[] | null) {
    if (items) {
      this.checkoutEvent.emit(items);
    }
  }

  getTotal(items: CartItem[] | null): number {
    if (items) {
      return this.cartService.getTotal(items);
    }
    return 0;
  }
}
