import { Address } from './address.model';
import { OrderItem } from './order-item.model';

export interface Order {
  items: OrderItem[];
  cod: boolean;
  address: Address;
  date: number;
  status: string;
  price: number;
}
