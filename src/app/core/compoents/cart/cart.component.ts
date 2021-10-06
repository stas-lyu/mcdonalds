import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../../shared/classes/cartItem';
import { Dish } from '../../../shared/classes/dish';
import { OrdersService } from '../../services/orders.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as CartActions from './store/actions/cart.actions';
import { Store } from '@ngrx/store';
import { ICartState } from './store/state/cart.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  storeSub!: Subscription;
  dishes: Dish[] = [];
  notifier = new Subject();
  isCartEmpty: boolean = !!JSON.parse(<string>localStorage.getItem('cart'))
    .length;
  totalPrice!: number;
  isLoading: boolean = true;

  cart: any = [];

  constructor(
    private categoriesService: CategoriesService,
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router,
    private store: Store<ICartState>
  ) {}

  ngOnInit(): void {
    this.totalPrice = this.getTotalPrice();
    this.loadCart();
  }

  removeCartItem(id: number): void {
    this.cart = this.cart.filter((item: CartItem) => item.cartId !== id);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.totalPrice = this.getTotalPrice();
    this.cartService.cartCounter;
    this.isCartEmpty = !!this.cart.length;
  }

  public getTotalPrice(event?: any) {
    return this.cart.reduce(
      (prev: number, el: { quantity: number; price: number }) => {
        let test = event || el.quantity;
        return Number((prev + el.price * test).toFixed(2));
      },
      0
    );
  }

  counterChange(event: any, id: number) {
    this.cart.forEach((item: { id: number; quantity: number }) => {
      console.log(this.cart, 'cart');
      if (item.id == id) {
        item.quantity = event;
      }
    });
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.totalPrice = this.getTotalPrice();
  }

  postOrderListener() {
    const order = {
      userId: Number(localStorage.getItem('user')),
      date: new Date(),
      status: 'success',
      items: this.cart,
      orderId: new Date().getMilliseconds(),
    };
    this.ordersService
      .postOrder(order)
      .pipe(takeUntil(this.notifier))
      .subscribe((): void => {
        localStorage.removeItem('cart');
        this.router.navigate(['thank-you-page']);
      });
  }

  loadCart(): void {
    this.store.dispatch(new CartActions.LoadCart());
    this.storeSub = this.store.select('cart').subscribe((response: any) => {
      this.cart = response.cart;
      // this.categoriesList = response.categories;
      this.isLoading = response.isLoading;
    });
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
