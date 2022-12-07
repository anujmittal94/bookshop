import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { BookKey } from '../models/book-key.model';
import { Book } from '../models/book.model';
import { Cart, CartItem } from '../models/cart.model';
import { BooksService } from './books.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<CartItem[]>([]);

  constructor(private toastrService: ToastrService) {}

  addItemToCart(book: BookKey) {
    const items = [...this.cart.value];
    const itemInCart = items.find((item) => {
      return item.book.key === book.key;
    });
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push({ book: book, quantity: 1 });
    }
    this.cart.next(items);
    this.toastrService.success('Item added to cart');
  }

  removeItemFromCart(book: BookKey) {
    let allRemovalItem: boolean = false;
    let filteredItems = this.cart.value.map((item) => {
      if (item.book.key === book.key) {
        item.quantity -= 1;
        if (item.quantity === 0) {
          allRemovalItem = true;
        }
      }
      return item;
    });
    if (allRemovalItem) {
      this.removeAllItemFromCart(book);
    } else {
      this.cart.next(filteredItems);
    }
    this.toastrService.success('Item removed from cart');
  }

  removeAllItemFromCart(book: BookKey) {
    let filteredItems = this.cart.value.filter((item) => {
      return item.book.key !== book.key;
    });
    this.cart.next(filteredItems);
    this.toastrService.success('Items removed from cart');
  }

  clearCart() {
    this.cart.next([]);
    this.toastrService.success('Cart cleared');
  }

  getTotal(items: CartItem[]) {
    return items
      ?.map((item) => item.book.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }
}
