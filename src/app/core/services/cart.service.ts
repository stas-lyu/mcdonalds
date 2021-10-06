import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  public get cartCounter() {
    if (localStorage.getItem('cart')) {
      return JSON.parse(<string>localStorage.getItem('cart')).length;
    }
  }

  public loadCart() {
    return from(JSON.parse(<string>localStorage.getItem('cart')));
  }
}
