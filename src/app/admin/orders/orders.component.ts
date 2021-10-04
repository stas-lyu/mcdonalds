import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Order } from '../../shared/classes/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  notifier = new Subject();
  orders: Order[] = [];
  orderItems: [] = [];
  date: string = '';

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.orderService
      .getOrder()
      .pipe(
        tap((response: any) => {
          this.orderItems = response.items;
        }),
        takeUntil(this.notifier)
      )
      .subscribe((response: any) => (this.orders = response));
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
