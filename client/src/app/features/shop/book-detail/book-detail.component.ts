import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BookKey } from 'src/app/core/models/book-key.model';
import { BooksService } from 'src/app/core/services/books.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book?: Observable<BookKey>;
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.book = this.booksService.getBookByKey(
      this.route.snapshot.params['key']
    );
  }

  onAdd(book: BookKey) {
    this.cartService.addItemToCart(book);
  }
}
