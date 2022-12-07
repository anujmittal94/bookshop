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

  checkoutst(items: CartItem[]): Observable<any> {
    return this.http.post('http://localhost:4242/checkout', { items: items });
  }

  checkoutrp() {
    console.log('rp');
  }
}
