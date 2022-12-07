import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { BookKey } from 'src/app/core/models/book-key.model';
import { Book } from 'src/app/core/models/book.model';
import { CartItem } from 'src/app/core/models/cart.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnChanges {
  items?: Observable<CartItem[]>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.cart;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.items);
  }

  removeItemFromCart(book: BookKey): void {
    this.cartService.removeItemFromCart(book);
  }

  addItemToCart(book: BookKey): void {
    this.cartService.addItemToCart(book);
  }

  removeAllItemFromCart(book: BookKey): void {
    this.cartService.removeAllItemFromCart(book);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getTotal(items: CartItem[] | null): number {
    if (items) {
      return this.cartService.getTotal(items);
    }
    return 0;
  }
}
