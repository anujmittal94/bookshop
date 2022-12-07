import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BookKey } from 'src/app/core/models/book-key.model';
import { Book } from 'src/app/core/models/book.model';
import { BooksService } from 'src/app/core/services/books.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  books?: Observable<any>;
  p: number = 1;
  searchTerm?: string;

  constructor(
    private booksService: BooksService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.books = this.booksService.getBooks();
    //this.booksService.getBooks2().subscribe((res) => console.log(res));
    //this.booksService.getBooks().subscribe((res) => console.log(res));
  }
}
