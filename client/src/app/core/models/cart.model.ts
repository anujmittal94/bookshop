import { BookKey } from './book-key.model';
import { Book } from './book.model';

export interface Cart {
  items: Array<CartItem>;
}
export interface CartItem {
  book: BookKey;
  quantity: number;
}
