import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap, tap } from 'rxjs';
import { Address } from 'src/app/core/models/address.model';
import { CartItem } from 'src/app/core/models/cart.model';
import { OrderItem } from 'src/app/core/models/order-item.model';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderService } from 'src/app/core/services/order.service';
import { PgsService } from 'src/app/core/services/pgs.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  address?: Address;
  items?: Observable<CartItem[]>;
  addressSubmitted: boolean = false;

  options = {
    key: environment.razorpay, // Enter the Key ID generated from the Dashboard
    amount: '49900', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'Acme Corp',
    description: 'Test Transaction',
    image: 'https://example.com/your_logo',
    order_id: '', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    // callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
    handler: function (response: any) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
    prefill: {
      name: 'Gaurav Kumar',
      email: 'gaurav.kumar@example.com',
      contact: '9999999999',
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#3399cc',
    },
  };

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private toastrService: ToastrService,
    private pgsService: PgsService
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.cart;
  }

  addressSubmit(address: Address): void {
    this.address = address;
    this.addressSubmitted = true;
    this.toastrService.success('Shipping detail confirmed');
  }

  editAddress() {
    this.addressSubmitted = false;
  }

  checkout(items: CartItem[]) {
    if (!this.address) {
      this.toastrService.warning('Please provide address');
      return;
    }
    let orderItems: OrderItem[] = items.map((item) => {
      return {
        key: item.book.key,
        title: item.book.title,
        quantity: item.quantity,
      };
    });
    this.createDBOrder(orderItems)
      .pipe(switchMap((_) => this.createGateOrder(items)))
      .subscribe((res: any) => {
        this.options.order_id = res.id;
        let rzp1 = new this.pgsService.nativeWindow.Razorpay(this.options);
        rzp1.open();
      });
  }

  createDBOrder(items: OrderItem[]): Observable<any> {
    return this.orderService
      .createOrder({
        items: items,
        cod: false,
        address: this.address!,
        date: new Date().getDate(),
        status: 'pending',
        price: this.cartService.getTotal(),
      })
      .pipe(tap((_) => this.cartService.clearCart()));
  }

  createGateOrder(items: CartItem[]): Observable<any> {
    return this.pgsService.createOrder(items);
  }
}
