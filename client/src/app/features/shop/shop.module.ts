import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CartComponent } from './cart/cart.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BannersComponent } from './banners/banners.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddressComponent } from './checkout/address/address.component';
import { PaymentComponent } from './checkout/payment/payment.component';
import { CartSummaryComponent } from './checkout/cart-summary/cart-summary.component';

@NgModule({
  declarations: [
    ShopComponent,
    BookDetailComponent,
    CartComponent,
    BookCardComponent,
    BannersComponent,
    CheckoutComponent,
    AddressComponent,
    PaymentComponent,
    CartSummaryComponent,
  ],
  imports: [CommonModule, ShopRoutingModule, SharedModule],
})
export class ShopModule {}
