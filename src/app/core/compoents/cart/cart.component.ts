import {Component, Input, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../../shared/classes/cartItem";
import {Dish} from "../../../shared/classes/dish";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  dishes: Dish[] = [];
  quantity!: number;
  counter!: number;
  totalPrice!: number;
  @Input()
  counterValue: string | undefined;

  cart: CartItem[] = JSON.parse(<string>localStorage.getItem('cart'));

  constructor(private categoriesService: CategoriesService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.totalPrice = this.getTotalPrice
  }

  public quantityValue(num: number): void {
    this.quantity = num
  }

  removeCartItem(id: number): void {
    this.cart = this.cart.filter((item) => {
      return item.id !== id
    })
    localStorage.setItem('cart', JSON.stringify(this.cart))
    this.totalPrice = this.getTotalPrice
    this.cartService.getCartCounter
  }

  public get getTotalPrice() {
    return this.cart.reduce((prev, el) => {
      return Number((prev + el.price * el.quantity).toFixed(2))
    }, 0)
  }

}
