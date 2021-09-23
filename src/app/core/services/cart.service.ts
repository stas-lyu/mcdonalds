import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartCounter = 0;

  constructor() { }

  public get getCartCounter() {
    if (localStorage.getItem("cart") !== null) {
      return this.cartCounter = JSON.parse(<string>localStorage.getItem("cart")).length
    }
  }
}
