import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  public get cartCounter() {
    if (localStorage.getItem("cart")) {
      return JSON.parse(<string>localStorage.getItem("cart")).length
    }
  }
}
