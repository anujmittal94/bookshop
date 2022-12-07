import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderKey } from '../models/order-key.model';
import { Order } from '../models/order.model';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private toastrService: ToastrService) {}

  getPendingOrders(): Observable<OrderKey[]> {
    return this.http
      .get<Order[]>(`${environment.firebase_db_url}/orders.json`)
      .pipe(
        map((res) => {
          let items: OrderKey[] = [];
          for (const [key, value] of Object.entries(res)) {
            items.push({ key: key, ...value });
          }
          return items.filter((item) => item.status === 'pending');
        })
      );
  }

  getCompletedOrders(): Observable<OrderKey[]> {
    return this.http
      .get<Order[]>(`${environment.firebase_db_url}/orders.json`)
      .pipe(
        map((res) => {
          let items: OrderKey[] = [];
          for (const [key, value] of Object.entries(res)) {
            items.push({ key: key, ...value });
          }
          return items.filter((item) => item.status === 'completed');
        })
      );
  }

  completeOrder(key: string, order: Order): Observable<any> {
    return this.http
      .put<Order>(`${environment.firebase_db_url}/orders/${key}.json`, order)
      .pipe(tap((_) => this.toastrService.success('Order marked complete')));
  }

  // deleteOrder(key: string): Observable<any> {
  //   return this.http
  //     .delete<Order>(`${environment.firebase_db_url}/Orders/${key}.json`)
  //     .pipe(tap((_) => this.toastrService.success('Order Deleted')));
  // }

  // updateOrder(Order: Order): Observable<any> {
  //   return this.http.put<Order>(`${environment.db_url}/Orders/${Order.id}`, Order);
  // }
  // updateOrder(key: string, Order: Order): Observable<any> {
  //   return this.http
  //     .put<Order>(`${environment.firebase_db_url}/Orders/${key}.json`, Order)
  //     .pipe(tap((_) => this.toastrService.success('Order Updated')));
  // }

  createOrder(Order: Order): Observable<any> {
    return this.http
      .post<Order>(`${environment.firebase_db_url}/orders.json`, Order)
      .pipe(tap((_) => this.toastrService.success('Order Confirmed')));
  }
}
