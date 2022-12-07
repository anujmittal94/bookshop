import { Component, Input, OnInit } from '@angular/core';
import { BookKey } from 'src/app/core/models/book-key.model';
import { Book } from 'src/app/core/models/book.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  constructor(private cartService: CartService) {}
  @Input() book?: BookKey;

  ngOnInit(): void {}

  addItemToCart(book: BookKey): void {
    this.cartService.addItemToCart(book);
  }
}
