import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, tap, Observable, forkJoin } from 'rxjs';
import { ShortTitlePipe } from 'src/app/shared/pipes/short-title.pipe';
import { BookKey } from '../models/book-key.model';
import { CartItem } from '../models/cart.model';
import { BooksService } from './books.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<CartItem[]>([]);
  cartIsEmpty: boolean = this.cart.value.length > 0;

  constructor(
    private toastrService: ToastrService,
    private shortTitlePipe: ShortTitlePipe,
    private bookService: BooksService,
    private http: HttpClient
  ) {}

  intializeCart() {
    if (localStorage.getItem('items')) {
      const items = JSON.parse(localStorage.getItem('items')!);
      this.cart.next(items);
    }
  }

  validateCart(): Observable<any> {
    const items: CartItem[] = [...this.cart.value];
    let updates: Observable<any>[] = [];
    let updated: boolean = false;
    for (let item of items) {
      updates.push(
        this.bookService.getBookByKey(item.book.key).pipe(
          tap((book: BookKey) => {
            if (JSON.stringify(item.book) != JSON.stringify(book)) {
              item.book = book;
              updated = true;
            }
          })
        )
      );
    }
    return forkJoin(updates).pipe(
      tap((_) => {
        this.cart.next(items);
        localStorage.setItem('items', JSON.stringify(items));
        if (updated) {
          this.toastrService.warning(
            'Some details may have been updated, please review.'
          );
        }
      })
    );
  }

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
    localStorage.setItem('items', JSON.stringify(items));
    this.toastrService.success(
      `1 ${this.shortTitlePipe.transform(book.title)} added to cart`
    );
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
      this.toastrService.success(
        `1 ${this.shortTitlePipe.transform(book.title)} removed from cart`
      );
      this.cart.next(filteredItems);
      localStorage.setItem('items', JSON.stringify(filteredItems));
    }
  }

  removeAllItemFromCart(book: BookKey) {
    let filteredItems = this.cart.value.filter((item) => {
      return item.book.key !== book.key;
    });
    this.cart.next(filteredItems);
    localStorage.setItem('items', JSON.stringify(filteredItems));
    this.toastrService.success(
      `${this.shortTitlePipe.transform(book.title)} removed from cart`
    );
  }

  clearCart() {
    this.cart.next([]);
    localStorage.setItem('items', JSON.stringify([]));
    this.toastrService.success('Cart cleared');
  }

  getTotal() {
    return this.cart.value
      ?.map((item) => item.book.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }
}
