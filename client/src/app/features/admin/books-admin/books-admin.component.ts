import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookKey } from 'src/app/core/models/book-key.model';
import { Book } from 'src/app/core/models/book.model';
import { BooksService } from 'src/app/core/services/books.service';

@Component({
  selector: 'app-books-admin',
  templateUrl: './books-admin.component.html',
  styleUrls: ['./books-admin.component.scss'],
})
export class BooksAdminComponent implements OnInit {
  openFormStatus: boolean = false;
  editBookStatus: boolean = false;
  books?: Observable<any>;
  bookToEdit?: BookKey;
  p: number = 1;
  searchTerm?: string;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  openForm() {
    this.openFormStatus = !this.openFormStatus;
  }

  getBooks(): void {
    this.books = this.booksService.getBooks();
  }

  deleteBook(key: string) {
    this.booksService.deleteBook(key).subscribe((_) => this.getBooks());
  }

  editBook(book: BookKey) {
    this.bookToEdit = book;
    this.editBookStatus = true;
    this.openFormStatus = true;
    window.scroll(0, 0);
  }

  formSubmitComplete() {
    this.openFormStatus = false;
    this.editBookStatus = false;
    this.getBooks();
  }
}
