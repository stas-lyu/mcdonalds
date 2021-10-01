import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../../shared/classes/cartItem';
import { Dish } from '../../../shared/classes/dish';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  dishes: Dish[] = [];
  isCartEmpty: boolean = !!JSON.parse(<string>localStorage.getItem('cart'))
    .length;
  totalPrice!: number;

  cart: CartItem[] = JSON.parse(<string>localStorage.getItem('cart'));

  constructor(
    private categoriesService: CategoriesService,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.totalPrice = this.getTotalPrice();
  }

  removeCartItem(id: number): void {
    this.cart = this.cart.filter((item: CartItem) => {
      return item.cartId !== id;
    });
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.totalPrice = this.getTotalPrice();
    this.cartService.cartCounter;
    this.isCartEmpty = !!this.cart.length;
  }

  public getTotalPrice(event?: any) {
    return this.cart.reduce((prev, el) => {
      let test = event || el.quantity;
      return Number((prev + el.price * test).toFixed(2));
    }, 0);
  }

  counterChange(event: any, id: number) {
    this.cart.forEach((item) => {
      if (item.id == id) {
        item.quantity = event;
      }
    });
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.totalPrice = this.getTotalPrice();
  }

  postOrderListener() {
    this.ordersService.postOrder(this.cart).subscribe();
  }
}
