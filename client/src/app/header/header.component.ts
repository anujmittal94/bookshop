import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/core/models/cart.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  totalItems: number = 0;
  cartSub?: Subscription;
  private _cart: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartSub = this.cartService.cart.subscribe((res) => {
      this.totalItems = res
        .map((item) => item.quantity)
        .reduce((prev, current) => prev + current, 0);
    });
  }

  ngOnDestroy(): void {
    this.cartSub?.unsubscribe();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logoutUser(): void {
    this.authService.logoutUser();
  }
}
