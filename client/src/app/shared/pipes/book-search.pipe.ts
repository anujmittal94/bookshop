import { Pipe, PipeTransform } from '@angular/core';
import { BookKey } from 'src/app/core/models/book-key.model';
import { Book } from 'src/app/core/models/book.model';

@Pipe({
  name: 'bookSearch',
})
export class BookSearchPipe implements PipeTransform {
  transform(books: BookKey[], searchTerm: string | undefined): BookKey[] {
    if (!books || !searchTerm) {
      return books;
    }
    return books.filter(
      (book) =>
        book.title
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) ||
        book.author
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) ||
        book.year.toString().includes(searchTerm.toLocaleLowerCase()) ||
        book.language
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) ||
        book.pages.toString().includes(searchTerm.toLocaleLowerCase()) ||
        book.imageLink
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) ||
        book.link
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) ||
        book.price.toString().includes(searchTerm.toLocaleLowerCase())
    );
  }
}
