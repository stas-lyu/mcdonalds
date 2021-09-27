import {Component, OnInit} from '@angular/core';
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

  totalPrice!: number;

  counter!: number;

  cart: CartItem[] = JSON.parse(<string>localStorage.getItem('cart'));

  constructor(private categoriesService: CategoriesService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.totalPrice = this.getTotalPrice();
  }

  removeCartItem(id: number): void {
    this.cart = this.cart.filter((item) => {
      return item.id !== id
    })
    localStorage.setItem('cart', JSON.stringify(this.cart))
    this.totalPrice = this.getTotalPrice()
    this.cartService.cartCounter
  }

  public getTotalPrice(event?: any) {
    return this.cart.reduce((prev, el) => {
      let test = event || el.quantity;
      return Number((prev + (el.price * test)).toFixed(2))
    }, 0)
  }

  counterChange(event: any, id: number) {
    this.cart.forEach((item) => {
      if (item.id == id) {
        item.quantity = event
      }
    })
    localStorage.setItem('cart', JSON.stringify(this.cart))
    this.totalPrice = this.getTotalPrice()
  }
}
