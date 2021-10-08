import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../../shared/classes/cartItem';
import { Dish } from '../../../shared/classes/dish';
import { OrdersService } from '../../services/orders.service';
import { take, takeUntil } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as CartActions from './store/actions/cart.actions';
import { Store } from '@ngrx/store';
import { ICartState } from './store/state/cart.state';
import { getCart } from './store/selectors/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  shoppingItems!: any;
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
    this.shoppingItems = this.store
      .select(getCart)
      .subscribe((cart) => console.log('this is cart!!,', cart));
    // this.shoppingItems = this.store
    //   .select(getCart)
    //   .pipe(take(5))
    //   .subscribe((s) => console.log(s));
    //
  }

  onQuantityChange(shoppingItem: CartItem) {
    shoppingItem.quantity = Number(shoppingItem.quantity);
    // shoppingItem.price = shoppingItem.product.productPrice * Number(quantity);
    this.store.dispatch(new CartActions.UpdateItemAction(shoppingItem));
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
      if (item.id == id) {
        // MUTED STATE NEED DOING WITH SPREAD
        console.log(item);
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

  // loadCart(): void {
  //   this.store.dispatch(new CartActions.LoadCart());
  //   this.storeSub = this.store.select(getCart).subscribe((cart: CartItem) => {
  //     this.cart = cart;
  //   });
  // }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
