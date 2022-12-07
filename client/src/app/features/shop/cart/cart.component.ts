import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { BookKey } from 'src/app/core/models/book-key.model';
import { CartItem } from 'src/app/core/models/cart.model';
import { CartService } from 'src/app/core/services/cart.service';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { PgsService } from 'src/app/core/services/pgs.service';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/core/services/books.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnChanges {
  items?: Observable<CartItem[]>;
  // showSpinner: boolean = false;

  constructor(
    private cartService: CartService,
    private pgsService: PgsService,
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.cart;
    this.cartService.validateCart().subscribe();
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

  getTotal(): number {
    if (this.items) {
      return this.cartService.getTotal();
    }
    return 0;
  }

  // checkoutst(items: CartItem[]) {
  //   this.showSpinner = true;
  //   this.pgsService.checkoutst(items).subscribe(async (res: any) => {
  //     let stripe = await loadStripe(environment.stripe_public);
  //     stripe?.redirectToCheckout({
  //       sessionId: res.id,
  //     });
  //     console.log(res);
  //     this.showSpinner = false;
  //   });
  // }
  checkoutrp(items: CartItem[]) {
    //this.pgsService.checkoutrp(items);
    this.cartService.validateCart().subscribe();
    this.router.navigate(['/shop', 'checkout']);
  }
}
