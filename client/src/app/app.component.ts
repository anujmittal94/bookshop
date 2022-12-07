import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'book-eshop';

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.intializeCart();
    if (
      this.authService.isAuthenticated() &&
      !this.authService.isNotExpired()
    ) {
      this.authService.refreshToken().subscribe();
    }
  }
}
