import { Component, OnInit } from '@angular/core';
import { OrderKey } from 'src/app/core/models/order-key.model';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/core/services/order.service';
@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.scss'],
})
export class OrdersAdminComponent implements OnInit {
  completedOrders?: Observable<any>;
  pc: number = 1;
  pendingOrders?: Observable<any>;
  pp: number = 1;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.completedOrders = this.orderService.getCompletedOrders();
    this.pendingOrders = this.orderService.getPendingOrders();
  }

  completeOrder(order: OrderKey): void {
    order.status = 'completed';
    this.orderService
      .completeOrder(order.key, order)
      .subscribe((_) => this.loadOrders());
  }
}
