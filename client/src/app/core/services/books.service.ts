import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookKey } from '../models/book-key.model';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient, private toastrService: ToastrService) {}

  // getBooksOld(): Observable<Book[]> {
  //   return this.http.get<Book[]>(`${environment.db_url}/books`);
  // }

  getBooks(): Observable<BookKey[]> {
    return this.http
      .get<Book[]>(`${environment.firebase_db_url}/books.json`)
      .pipe(
        map((res) => {
          let items: BookKey[] = [];
          for (const [key, value] of Object.entries(res)) {
            items.push({ key: key, ...value });
          }
          return items;
        })
      );
  }

  getBookByKey(key: string): Observable<BookKey> {
    return this.http
      .get<Book>(`${environment.firebase_db_url}/books/${key}.json`)
      .pipe(
        map((res) => {
          return { key: key, ...res };
        })
      );
  }

  // getBookById(id: number): Observable<Book> {
  //   return this.http.get<Book>(`${environment.db_url}/books/${id}`);
  // }

  // deleteBook(id: number): Observable<Book> {
  //   return this.http.delete<Book>(`${environment.db_url}/books/${id}`);
  // }
  deleteBook(key: string): Observable<any> {
    return this.http
      .delete<Book>(`${environment.firebase_db_url}/books/${key}.json`)
      .pipe(tap((_) => this.toastrService.success('Book Deleted')));
  }

  // updateBook(book: Book): Observable<any> {
  //   return this.http.put<Book>(`${environment.db_url}/books/${book.id}`, book);
  // }
  updateBook(key: string, book: Book): Observable<any> {
    return this.http
      .put<Book>(`${environment.firebase_db_url}/books/${key}.json`, book)
      .pipe(tap((_) => this.toastrService.success('Book Updated')));
  }

  createBook(book: Book): Observable<any> {
    return this.http
      .post<Book>(`${environment.firebase_db_url}/books.json`, book)
      .pipe(tap((_) => this.toastrService.success('Book Created')));
  }
}
