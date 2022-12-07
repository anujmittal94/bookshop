import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Address } from 'src/app/core/models/address.model';
import { CartItem } from 'src/app/core/models/cart.model';
import { OrderItem } from 'src/app/core/models/order-item.model';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  address?: Address;
  payment: boolean = false;
  items?: Observable<CartItem[]>;
  cod: boolean = false;
  items2: CartItem[] = [];

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.cart;
  }

  addressSubmit(address: Address): void {
    this.address = address;
    this.toastrService.success('Shipping detail confirmed');
  }

  paymentSubmit(cod: boolean): void {
    this.cod = cod;
    this.toastrService.success('Payment confirmed');
  }

  checkout(items: CartItem[]) {
    if (!this.address) {
      this.toastrService.warning('Please provide address');
      return;
    }
    if (!this.cod) {
      this.toastrService.warning('Please confirm payment (COD)');
      return;
    }
    let orderItems: OrderItem[] = items.map((item) => {
      return {
        key: item.book.key,
        title: item.book.title,
        quantity: item.quantity,
      };
    });
    this.orderService
      .createOrder({
        items: orderItems,
        cod: this.cod,
        address: this.address,
        date: new Date().getDate(),
        status: 'pending',
        price: this.cartService.getTotal(items),
      })
      .subscribe((res) => {
        this.cartService.clearCart();
        this.router.navigate(['']);
      });
  }
}
