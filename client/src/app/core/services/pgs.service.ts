import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Observable } from 'rxjs';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class PgsService {
  constructor(private http: HttpClient) {}

  get nativeWindow(): any {
    return _window();
  }

  // checkoutst(items: CartItem[]): Observable<any> {
  //   return this.http.post('http://localhost:4242/checkout', { items: items });
  // }

  checkoutrp(items: CartItem[]) {
    return this.http
      .post('http://localhost:4242/createOrder2', items)
      .subscribe((res) => console.log(res));
  }

  // createOrder() {
  //   var options = {
  //     amount: '39900',
  //     currency: 'INR',
  //     receipt: 'somerecno2',
  //     notes: {
  //       description: 'apples',
  //     },
  //   };

  //   return this.http.post('http://localhost:4242/createOrder', options);
  // }

  createOrder(items: CartItem[]): Observable<any> {
    return this.http.post('http://localhost:4242/createOrder', items);
  }
}
