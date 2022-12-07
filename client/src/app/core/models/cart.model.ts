import { BookKey } from './book-key.model';

export interface CartItem {
  book: BookKey;
  quantity: number;
}
