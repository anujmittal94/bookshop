import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { BooksAdminComponent } from './books-admin/books-admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookFormComponent } from './books-admin/book-form/book-form.component';
import { OrdersAdminComponent } from './orders-admin/orders-admin.component';

@NgModule({
  declarations: [
    AdminComponent,
    BooksAdminComponent,
    BookFormComponent,
    OrdersAdminComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
