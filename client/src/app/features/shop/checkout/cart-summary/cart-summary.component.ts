import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/core/models/cart.model';
import { CartService } from 'src/app/core/services/cart.service';
import { Address } from 'src/app/core/models/address.model';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
  @Input() items: CartItem[] | null = null;
  @Input() address?: Address;
  @Output() paymentEvent: EventEmitter<CartItem[]> = new EventEmitter<
    CartItem[]
  >();
  @Output() editAddressEvent: EventEmitter<void> = new EventEmitter();
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  editAddress() {
    this.editAddressEvent.emit();
  }

  payment(items: CartItem[] | null) {
    if (items) {
      this.paymentEvent.emit(items);
    }
  }

  getTotal(): number {
    if (this.items) {
      return this.cartService.getTotal();
    }
    return 0;
  }
}
